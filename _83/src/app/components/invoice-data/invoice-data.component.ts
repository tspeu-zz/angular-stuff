import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Affiliate } from 'src/app/models/affiliate';
import { AffiliatesService } from 'src/app/services/affiliates.service';
import { InvoiceData } from 'src/app/models/invoice-data';
import { Country } from 'src/app/models/country';
import { Region } from 'src/app/models/region';
import { ProfileService } from 'src/app/services/profile.services';
import { personalDataBind } from '../personal-data/personal-data.component';


@Component({
  selector: 'app-invoice-data',
  templateUrl: './invoice-data.component.html',
  styleUrls: ['./invoice-data.component.scss']
})
export class InvoiceDataComponent implements OnInit, OnChanges {

  @Input() countries: Country[];
  @Input() bindPersonalData: boolean;

  invoiceForm: FormGroup;
  affiliate: Affiliate;
  affiliateInvoiceData: InvoiceData = new InvoiceData();
  // countries: Country[] = [];
  regions: Region[] = [];
  regionsInvoice: Region[] = [];
  prefixCountryInvoice = '';
  labelCompanyType = '';
  LabelCompany = '';
  labelFreelance = 'Nombre y apellidos';
  labelCompany = 'Nombre de la empresa';
  labelCIF = 'CIF';
  labelDNI = 'DNI/NIE';
  // showCompanytype = false;
  checkCompanyType = false;
  checkFreelanceType = false;

  constructor(private userService: UserService<Affiliate>,
    private fb: FormBuilder,
    private affiliatesService: AffiliatesService,
    private profileService: ProfileService<personalDataBind>) { }

  ngOnInit() {
    this.affiliate = this.userService.getUserValue();
    this.initInvoiceForm();

    this.labelCompanyType = this.labelCompany;
    this.LabelCompany = this.labelCIF;

    // this.countryService.getCountries()
    //   .subscribe(res => {
    //     if (res.success) {
    //       this.countries = [...res.response];
    //     }
    //   });



    this.onChangeCompanyType();


  }
  ngOnChanges(SimpleChanges: any): void {

    if (this.bindPersonalData) {
      console.log('--> this.bindPersonalData', this.bindPersonalData);
      const profilePersonalData = this.profileService.getProfileDataValue();
      console.log(' this.profilePersonalData', profilePersonalData);
      this.bindPersonalDataToInvoice(profilePersonalData);
    }
    if (this.bindPersonalData === false) {
      this.clearPersonalDataToInvoice();
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
    this.setAffiliateInvoiceData();

    this.affiliatesService.updateInvoiceData(this.affiliate.id, this.affiliateInvoiceData)
      .subscribe(res => {
        if (res.success) {
          this.affiliate.invoiceData = this.affiliateInvoiceData;
          this.userService.setUserData(this.affiliate);
        }
      });
  }

  setAffiliateInvoiceData(): InvoiceData {
    const ibanValue = this.setIbanValue();
    return this.affiliateInvoiceData = {
      companyType: Number(this.invoiceForm.get('companyType').value),
      companyName: this.invoiceForm.get('companyName').value,
      cif: this.invoiceForm.get('cif').value,
      address: this.invoiceForm.get('invoiceAddress').value,
      countryCode: this.invoiceForm.get('invoiceCountryCode').value,
      regionCode: this.invoiceForm.get('invoiceRegionCode').value,
      postalCode: this.invoiceForm.get('invoicePostalCode').value,
      phone: this.invoiceForm.get('invoicePhone').value,
      iban: ibanValue
    };
  }

  onChangeCompanyType() {
    this.invoiceForm.get('companyType').valueChanges.subscribe(value => this.toogleCompanyType(value));
  }


  onChangeCountryInvoice(countryCode: string) {
    if (countryCode !== null) {
      this.setRegionsByCountry(countryCode);
      this.invoiceForm.get('invoiceRegionCode').enable();
    } else {
      this.invoiceForm.get('invoiceRegionCode').disable();
    }
  }

  bindPersonalDataToInvoice(personalData: any): void {
    this.prefixCountryInvoice = personalData.prefixCountry;
    this.checkFreelanceType = true;
    this.invoiceForm.patchValue({
      companyType: 1,
      companyName: personalData.companyName,
      cif: personalData.cif,
      invoiceAddress: personalData.invoiceAddress,
      invoiceCountryCode: personalData.invoiceCountryCode,
      invoiceRegionCode: personalData.invoiceRegionCode,
      invoicePostalCode: personalData.invoicePostalCode,
      invoicePhone: personalData.invoicePhone
    });
  }


  clearPersonalDataToInvoice(): void {
    this.prefixCountryInvoice = '';
    this.invoiceForm.patchValue({
      companyType: 0,
      companyName: '',
      cif: '',
      invoiceAddress: '',
      invoiceCountryCode: null,
      invoiceRegionCode: null,
      invoicePostalCode: '',
      invoicePhone: ''
    });
  }

  setIbanValue(): string {
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

  toogleCompanyType(typeCompany: number): void {
    if (typeCompany >= 1) {
      this.setFreelanceLabel();
    } else {
      this.setCompanyLabel();
    }
  }

  // setCompanyName(showCompany: boolean) {
  //   if (showCompany) {
  //     this.setCompanyLabel();
  //   } else {
  //     this.setFreelanceLabel();
  //   }
  // }

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


}
