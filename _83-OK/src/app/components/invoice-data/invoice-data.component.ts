import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AffiliatesService } from 'src/app/services/affiliates.service';
import { UserService } from 'src/app/services/user.service';
import { Affiliate } from 'src/app/models/affiliate';
import { Country } from 'src/app/models/country';
import { SharePersonalData } from 'src/app/models/share-personal-data';
import { InvoiceData } from 'src/app/models/invoice-data';
import { Region } from 'src/app/models/region';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-invoice-data',
  templateUrl: './invoice-data.component.html',
  styleUrls: ['./invoice-data.component.scss']
})
export class InvoiceDataComponent implements OnInit, OnChanges {

  @Input() user: BehaviorSubject<Affiliate>;
  @Input() countries: Country[];
  @Input() personalData: SharePersonalData;
  // solo test
  @Input() isFirstVisit: boolean;


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

  constructor(private userService: UserService<Affiliate>,
    private fb: FormBuilder,
    private affiliatesService: AffiliatesService) { }

  ngOnInit() {
    if (this.user) {
      this.affiliate = this.user.getValue();

    }
    this.initInvoiceForm();
    this.labelCompanyType = this.labelCompany;
    this.LabelCompany = this.labelCIF;

    this.onChangeCompanyType();
    // this.affiliate.FirstVisit
    this.loadAffiliateInvoiceData(this.isFirstVisit);
  }

  ngOnChanges(SimpleChanges): void {

    this.affiliate = this.user.getValue();
    if (!SimpleChanges.countries.firstChange) {
      // this.affiliate.FirstVisit
      this.loadAffiliateInvoiceData(this.isFirstVisit);
    }


    if (this.personalData) {
      this.bindPersonalDataToInvoice(this.personalData);
    }
    if (this.personalData === null) {
      this.clearInvoiceData();
    }
  }

  initInvoiceForm() {
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

    this.affiliatesService.updateInvoiceData(this.affiliate.id, this.affiliateInvoiceData)
      .subscribe(res => {
        if (res.success) {
          this.affiliate.invoiceData = this.affiliateInvoiceData;
          this.userService.setUserData(this.affiliate);
        }
      });
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
      companyType: null,
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

  setRegionsByCountry(countryCode: string) {
    this.countries.filter(c => c.isoCode === countryCode)
      .map(co => {
        this.regionsInvoice = co.regions;
        this.prefixCountryInvoice = this.formatPrefixNumber(co.phone);

        const regexPostalCodeInvoice = co.postalCodeRegex;
        const postalCodeInvoice = this.invoiceForm.get('invoicePostalCode');
        if (regexPostalCodeInvoice !== null) {
          postalCodeInvoice.setValidators([Validators.pattern(regexPostalCodeInvoice), Validators.required]);
        } else {
          postalCodeInvoice.setValidators([Validators.required, Validators.minLength(3)]);
        }
        postalCodeInvoice.updateValueAndValidity();

        this.invoiceForm.patchValue({ invoiceRegionCode: '' });
      });
  }

  toggleCompanyType(typeCompany: number): void {
    if (typeCompany >= 1) {
      this.setFreelanceLabel();
    } else {
      this.setCompanyLabel();
    }
  }

  setCompanyLabel() {
    this.labelCompanyType = this.labelCompany;
    this.LabelCompany = this.labelCIF;
    this.checkCompanyType = true;
    this.checkFreelanceType = false;
  }

  setFreelanceLabel() {
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

  setInvoiceDataFormValue() {
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
        ibanCountryCode: 'AS12',
        ibanEntity: '0001',
        ibanOffice: '0002',
        ibanControlDigit: '22',
        ibanAccountNumber: '1234567890'
      }

    };

    this.invoiceForm.patchValue(invoiceData);

  }

}
