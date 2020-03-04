import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AffiliatesService } from 'src/app/services/affiliates.service';
import { UserService } from 'src/app/services/user.service';
import { Affiliate } from 'src/app/models/affiliate';
import { GeoCountry } from 'src/app/models/geo-country';
import { SharePersonalData } from 'src/app/models/share-personal-data';
import { InvoiceData } from 'src/app/models/invoice-data';
import { Region } from 'src/app/models/region';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Component({
  selector: 'app-invoice-data',
  templateUrl: './invoice-data.component.html',
  styleUrls: ['./invoice-data.component.scss']
})
export class InvoiceDataComponent implements OnInit, OnChanges {

  // @Input() user: BehaviorSubject<Affiliate>;
  @Input() user: Affiliate;
  @Input() countries: GeoCountry[];
  @Input() personalData: SharePersonalData;

  invoiceForm: FormGroup;
  affiliate: Affiliate;
  affiliateInvoiceData: InvoiceData = new InvoiceData();
  regionsInvoice: Region[] = [];
  prefixCountryInvoice = '';
  labelCompanyType = '';
  LabelCompany = '';
  labelFreelance = 'Nombre y apellidos';
  labelCompany = 'Nombre de la empresa';
  labelCIF = 'CIF';
  labelDNI = 'DNI/NIE';
  checkCompanyType = false;
  checkFreelanceType = false;
  labelSaveButton = 'Continuar';

  constructor(private userService: UserService<Affiliate>,
    private fb: FormBuilder, private router: Router,
    private affiliatesService: AffiliatesService) {
    this.initInvoiceForm();
  }

  ngOnInit() {
    this.labelCompanyType = this.labelCompany;
    this.LabelCompany = this.labelCIF;
    this.onChangeCompanyType();
  }

  ngOnChanges(SimpleChanges): void {
    if (this.user) {
      this.affiliate = this.user;
      this.setButtonLabel(this.affiliate.firstVisit);
    }

    if (SimpleChanges.countries && SimpleChanges.countries.currentValue.length > 0) {
      this.loadAffiliateInvoiceData(this.affiliate.firstVisit);
      this.countries.filter(c => c.isoCode === this.affiliate.invoiceData.countryCode)
        .map(co => {
          this.regionsInvoice = co.regions;
          this.prefixCountryInvoice = this.formatPrefixNumber(co.phone);

          this.setPostalCodeValidatorByCountry(co.postalCodeRegex);
        });
      this.invoiceForm.patchValue({
        invoiceRegionCode: this.affiliate.invoiceData.regionCode,
        companyType: this.affiliate.invoiceData.companyType
      });
    }
    if (this.personalData) {
      this.bindPersonalDataToInvoice(this.personalData);
    }
    if (this.personalData === null) {
      this.clearInvoiceData();
    }
  }

  onChangeCompanyType() {
    this.invoiceForm.get('companyType').valueChanges.subscribe(value => this.toggleCompanyType(value));
  }

  onChangeCountryInvoice(countryCode: string) {
    if (countryCode !== null) {
      this.setRegionsByCountry(countryCode);
      this.invoiceForm.get('invoiceRegionCode').enable();
    } else {
      this.invoiceForm.get('invoiceRegionCode').disable();
    }
  }

  initInvoiceForm(): void {
    this.invoiceForm = this.fb.group({
      companyType: [null, [Validators.required, Validators.maxLength(20)]],
      companyName: ['', [Validators.required, Validators.maxLength(100)]],
      cif: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      invoiceAddress: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(300)]],
      invoiceCountryCode: [null, Validators.required],
      invoiceRegionCode: [null, Validators.required],
      invoicePostalCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      invoicePhone: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]*$'), Validators.maxLength(15)]],
      ibanForm: this.fb.group({
        ibanCountryCode: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{2}$/)]],
        ibanEntity: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
        ibanOffice: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
        ibanControlDigit: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
        ibanAccountNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      })
    });

  }

  get invoiceControl() {
    return this.invoiceForm.controls;
  }

  onSubmitInvoice() {
    this.getInvoiceFormValue();
    if (this.affiliate.firstVisit) {
      forkJoin(
        this.affiliatesService.updatePersonalData(this.affiliate.id, this.affiliate.personalData),
        this.affiliatesService.updateInvoiceData(this.affiliate.id, this.affiliateInvoiceData))
        .subscribe(([personalResp, invoiceResp]) => {

          if (personalResp.success && invoiceResp.success) {
            this.affiliate.invoiceData = this.affiliateInvoiceData;
            this.affiliate.firstVisit = false;
            this.userService.setUserData(this.affiliate);
            this.router.navigateByUrl('/dashboard');

          }
        });
    } else {

      this.affiliatesService.updateInvoiceData(this.affiliate.id, this.affiliateInvoiceData)
        .subscribe(res => {
          if (res.success) {
            this.affiliate.invoiceData = this.affiliateInvoiceData;
            this.userService.setUserData(this.affiliate);
          }
        });
    }

  }

  getInvoiceFormValue(): InvoiceData {
    return this.affiliateInvoiceData = {
      companyType: Number(this.invoiceForm.get('companyType').value),
      companyName: this.invoiceForm.get('companyName').value,
      cif: this.invoiceForm.get('cif').value,
      address: this.invoiceForm.get('invoiceAddress').value,
      countryCode: this.invoiceForm.get('invoiceCountryCode').value,
      regionCode: this.invoiceForm.get('invoiceRegionCode').value,
      postalCode: this.invoiceForm.get('invoicePostalCode').value,
      phone: this.invoiceForm.get('invoicePhone').value,
      iban: this.getIbanFormValue()
    };
  }

  bindPersonalDataToInvoice(personalData: SharePersonalData): void {
    this.prefixCountryInvoice = personalData.prefixCountry;
    this.checkFreelanceType = true;
    this.invoiceForm.patchValue({
      companyType: 1,
      companyName: personalData.invoiceData.companyName,
      cif: personalData.invoiceData.cif,
      invoiceAddress: personalData.invoiceData.address,
      invoiceCountryCode: personalData.invoiceData.countryCode,
      invoiceRegionCode: personalData.invoiceData.regionCode,
      invoicePostalCode: personalData.invoiceData.postalCode,
      invoicePhone: personalData.invoiceData.phone
    });
  }

  clearInvoiceData(): void {
    this.prefixCountryInvoice = '';
    this.invoiceForm.patchValue({
      companyType: 0,
      companyName: null,
      cif: null,
      invoiceAddress: null,
      invoiceCountryCode: null,
      invoiceRegionCode: null,
      invoicePostalCode: null,
      invoicePhone: null
    });
  }

  getIbanFormValue(): string {
    const ibanCountryCode = this.invoiceForm.get('ibanForm.ibanCountryCode').value;
    const ibanEntityValue = this.invoiceForm.get('ibanForm.ibanEntity').value;
    const ibanOfficeValue = this.invoiceForm.get('ibanForm.ibanOffice').value;
    const ControlDigitValue = this.invoiceForm.get('ibanForm.ibanControlDigit').value;
    const ibanAccountNumberValue = this.invoiceForm.get('ibanForm.ibanAccountNumber').value;
    return `${ibanCountryCode}${ibanEntityValue}${ibanOfficeValue}${ControlDigitValue}${ibanAccountNumberValue}`;
  }

  setRegionsByCountry(countryCode: string): void {
    this.countries.filter(c => c.isoCode === countryCode)
      .map(co => {
        this.regionsInvoice = co.regions;
        this.prefixCountryInvoice = this.formatPrefixNumber(co.phone);

        this.setPostalCodeValidatorByCountry(co.postalCodeRegex);
      });
  }

  setPostalCodeValidatorByCountry(regexPostalCodeInvoice: string): void {
    const postalCodeControl = this.invoiceForm.get('invoicePostalCode');
    if (regexPostalCodeInvoice !== null) {
      postalCodeControl.setValidators([Validators.pattern(regexPostalCodeInvoice), Validators.required]);
    } else {
      postalCodeControl.setValidators([Validators.required, Validators.minLength(3)]);
    }
    postalCodeControl.updateValueAndValidity();

    this.invoiceForm.patchValue({ invoiceRegionCode: null });
  }

  toggleCompanyType(typeCompany: number): void {
    if (typeCompany >= 1) {
      this.setFreelanceLabel();
    } else {
      this.setCompanyLabel();
    }
  }

  setCompanyLabel(): void {
    this.labelCompanyType = this.labelCompany;
    this.LabelCompany = this.labelCIF;
    this.checkCompanyType = true;
    this.checkFreelanceType = false;
  }

  setFreelanceLabel(): void {
    this.labelCompanyType = this.labelFreelance;
    this.LabelCompany = this.labelDNI;
    this.checkFreelanceType = true;
    this.checkCompanyType = false;
  }

  formatPrefixNumber(prefixValue: string): string {
    return (prefixValue !== '-') ? '+' + prefixValue : '+' + prefixValue.slice(0);
  }

  loadAffiliateInvoiceData(firstVisit: boolean) {
    if (!firstVisit) {
      this.setInvoiceDataFormValue();
    }
  }

  setInvoiceDataFormValue(): void {
    const invoiceData = {
      companyType: this.affiliate.invoiceData.companyType,
      companyName: this.affiliate.invoiceData.companyName,
      cif: this.affiliate.invoiceData.cif,
      invoiceAddress: this.affiliate.invoiceData.address,
      invoiceCountryCode: this.affiliate.invoiceData.countryCode,
      invoiceRegionCode: this.affiliate.invoiceData.regionCode,
      invoicePostalCode: this.affiliate.invoiceData.postalCode,
      invoicePhone: this.affiliate.invoiceData.phone,
      ibanForm: {
        ibanCountryCode: this.affiliate.invoiceData.iban.substring(0, 4),
        ibanEntity: this.affiliate.invoiceData.iban.substring(4, 8),
        ibanOffice: this.affiliate.invoiceData.iban.substring(8, 12),
        ibanControlDigit: this.affiliate.invoiceData.iban.substring(12, 14),
        ibanAccountNumber: this.affiliate.invoiceData.iban.substring(14)
      }
    };

    this.invoiceForm.patchValue(invoiceData);
  }

  setButtonLabel(isWelcomePage: boolean) {
    this.labelSaveButton = isWelcomePage ? 'Continuar' : 'Guardar';
  }

}
