import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Affiliate } from 'src/app/models/affiliate';
import { PersonalData } from 'src/app/models/personal-data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AffiliatesService } from 'src/app/services/affiliates.service';
import { InvoiceData } from 'src/app/models/invoice-data';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/models/Country';
import { Region } from 'src/app/models/Region';
import { ValidatorService } from 'angular-iban';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  welcomeForm: FormGroup;
  invoiceForm: FormGroup;
  affiliate: Affiliate;
  personalData: PersonalData = new PersonalData();
  affiliateInvoiceData: InvoiceData = new InvoiceData();
  showInvoiceDataForm = false;
  countries: Country[] = [];
  regions: Region[] = [];
  countriesInvoice: Country[] = [];
  regionsInvoice: Region[] = [];
  prefixCountry = '';
  prefixCountryInvoice = '';
  private readonly prefixWidth = 38;

  constructor(private userService: UserService<Affiliate>,
    private fb: FormBuilder,
    private affiliatesService: AffiliatesService,
    private countryService: CountryService) { }


  ngOnInit() {

    this.affiliate = this.userService.getUserValue();
    this.initWelcomeForm();
    this.initinvoiceForm();

    this.countryService.getCountries()
      .subscribe(res => {
        if (res.success) {

          this.countries = [...res.response];
          // console.log(this.countries);
          this.countriesInvoice = this.countries;
          // console.log(this.countriesInvoice);
          this.welcomeForm.get('countryCode').enable();
        } else {
          this.welcomeForm.get('countryCode').disable();
        }
      });


    this.onChangeCheck();
  }

  initWelcomeForm() {
    this.welcomeForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      countryCode: ['', Validators.required],
      regionCode: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]*$')]],
      acccept: [false, Validators.required],
      showInvoice: [false, ''],
    });

    this.welcomeForm.patchValue({
      name: this.affiliate.name ? this.affiliate.name : '',
      surname: this.affiliate.surname ? this.affiliate.surname : '',
    });
  }

  get welcomeControl() {
    return this.welcomeForm.controls;
  }

  onSubmit() {
    this.setAffilitePersonalData();

    this.affiliatesService.updatePersonalData(this.affiliate.id, this.personalData)
      .subscribe(res => {
        if (res.success) {
          console.log('res PersonalData()', res.data); // TODO:
        } else {
          console.log(res.errorMsg);  // TODO:
        }
      }
      );
  }

  setAffilitePersonalData() {
    return this.personalData = {
      dni: this.welcomeForm.get('dni').value,
      address: this.welcomeForm.get('address').value,
      countryCode: this.welcomeForm.get('countryCode').value,
      regionCode: this.welcomeForm.get('regionCode').value,
      postalCode: this.welcomeForm.get('postalCode').value,
      phone: this.welcomeForm.get('phone').value,
    };
  }


  onChangeCheck(): void {
    this.welcomeForm.get('showInvoice').valueChanges
      .subscribe(value => {
        if (value) {
          this.bindPersonalDataToInvoice();

        } else {
          this.invoiceForm.reset();
        }
      });
  }

  onChangeCountry($event) {
    const countryValue = $event;
    if (countryValue !== null) {
      this.countries.filter(c => {
        c.isoCode === countryValue
        console.log('c--->', c);
        this.prefixCountry = '';
        this.prefixCountry = c.phone;
      })
        .map(co => {
          this.regions = co.regions;
          // console.log( this.regions);
          this.welcomeForm.patchValue({ regionCode: '' });

        });
      // this.welcomeForm.get('regionCode').enable();
    }
  }


  getRegionsById(index: number) {
    return this.regions = this.countries[index].regions;
  }

  /**
   * INVOICE FORM
   */
  initinvoiceForm() {
    this.invoiceForm = this.fb.group({
      companyType: [null, Validators.required],
      companyName: ['', Validators.required],
      cif: ['', [Validators.required, Validators.minLength(4)]],
      invoiceAddress: ['', Validators.required],
      invoiceCountryCode: ['', Validators.required],
      invoiceRegionCode: ['', Validators.required],
      invoicePostalCode: ['', [Validators.required, Validators.minLength(4)]],
      invoicePhone: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]*$')]],
      iban: ['', [Validators.required, ValidatorService.validateIban]],
      ibanGroup: this.fb.group({
        countryCodeIban: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{2}$/)]],
        entityIban: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
        officeIban: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
        controlDigitIban: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
        accountNumberIban: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      })
    });
    //     
    /**
     *   countryCode: [{ value: '', disabled: this.selectedPaymentMethod !== 1 }, Validators.pattern(/^[A-Z]{2}\d{2}$/)],
      entity: [{ value: '', disabled: this.selectedPaymentMethod !== 1 }, Validators.pattern(/^\d{4}$/)],
      office: [{ value: '', disabled: this.selectedPaymentMethod !== 1 }, Validators.pattern()],
      controlDigit: [{ value: '', disabled: this.selectedPaymentMethod !== 1 }, Validators.pattern()],
      accountNumber: [{ value: '', disabled: this.selectedPaymentMethod !== 1 }, Validators.pattern()],
     * 
     */
  }

  onSubmitBilling() {
    this.setAffiliateInvoiceData();

    this.affiliatesService.updateInvoiceData(this.affiliate.id, this.affiliateInvoiceData)
      .subscribe(res => {
        if (res.success) {
          console.log('response InvoiceData()', res.data); // TODO:
        } else {
          console.log(res.errorMsg);  // TODO:
        }
      });
  }


  get invoiceControl() {
    return this.invoiceForm.controls;
  }

  setAffiliateInvoiceData() {
    return this.affiliateInvoiceData = {
      companyType: Number(this.invoiceForm.get('companyType').value),
      companyName: this.invoiceForm.get('companyName').value,
      cif: this.invoiceForm.get('cif').value,
      address: this.invoiceForm.get('invoiceAddress').value,
      countryCode: this.invoiceForm.get('invoiceCountryCode').value,
      regionCode: this.invoiceForm.get('invoiceRegionCode').value,
      postalCode: this.invoiceForm.get('invoicePostalCode').value,
      phone: this.invoiceForm.get('invoicePhone').value,
      iban: this.invoiceForm.get('iban').value
    };

  }


  onChangeCountryInvoice($event) {
    const countryInvoiceValue = $event;
    // console.log('$event--> ', $event);
    if (countryInvoiceValue !== null) {
      // console.log('vambio el select', countryInvoiceValue);
      this.countries.filter(c => c.isoCode === countryInvoiceValue)
        .map(co => {
          this.regionsInvoice = co.regions;
          // console.log( this.regionsInvoice);
          this.invoiceForm.patchValue({ invoiceRegionCode: '' });
        });
      this.invoiceForm.get('invoiceRegionCode').enable();
      // this.invoiceForm.get('invoiceRegionCode').markAsUntouched();
    } else {
      this.invoiceForm.get('invoiceRegionCode').disable();

    }

  }

  bindPersonalDataToInvoice() {
    this.prefixCountryInvoice = this.prefixCountry;

    this.invoiceForm.patchValue({
      cif: this.welcomeForm.get('dni').value,
      invoiceAddress: this.welcomeForm.get('address').value,
      invoiceCountryCode: this.welcomeForm.get('countryCode').value,
      invoiceRegionCode: this.welcomeForm.get('regionCode').value,
      invoicePostalCode: this.welcomeForm.get('postalCode').value,
      invoicePhone: this.welcomeForm.get('phone').value
    });
  }

}
