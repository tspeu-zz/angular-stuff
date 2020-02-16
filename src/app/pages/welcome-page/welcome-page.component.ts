import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Affiliate } from 'src/app/models/affiliate';
import { PersonalData } from 'src/app/models/personal-data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AffiliatesService } from 'src/app/services/affiliates.service';
import { InvoiceData } from 'src/app/models/invoice-data';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/models/Country';
import { map } from 'rxjs/operators';
/////
import * as data from './countries.json';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  welcomeForm: FormGroup;
  invoiceForm: FormGroup;
  affiliate: Affiliate;
  formActivate = false;
  personalData: PersonalData = new PersonalData();
  affiliateInvoiceData: InvoiceData = new InvoiceData();
  showInvoiceDataForm = false;
  countries: Country[] = [];
  country: any = {};
  regions: any = [];
  countriesData = {};
  regionsData = [];
  prefixCountry = '  ';
  private readonly prefixWidth = 38;

  constructor(private userService: UserService<Affiliate>,
    private fb: FormBuilder,
    private affiliatesService: AffiliatesService,
    private countryService: CountryService) { }


  ngOnInit() {


    this.countryService.getCountries()

      .subscribe(res => {
        console.log('res-> ', res);
        let data = res.response;
        // let datos = { ...data };
        // console.log('data', data);
        // console.log('datos', datos);
        this.countries = [...res.response];
        console.log('countries ---', this.countries);

        // this.countries = data.country;
        // this.regions = this.countries.regions;
        // console.log('regions', this.regions);

      });

    // this.countryService.getAllPaises();

    // this.countryService.getCountry()
    //   .pipe(
    //     map(res => {
    //       if (res.success) {
    //         console.log('--> res -> ', res);
    //         this.countriesData = { ...res.response.country };
    //         console.log('--> this.countriesData  -> ', this.countriesData);
    //         this.regionsData = [...this.countriesData.regions];
    //         console.log('--> this.regionsData  -> ', this.regionsData);

    //       } else {

    //       }
    //     })
    //   ).subscribe(
    //     res => {
    //       console.log('-------> res subscribe', res);
    //     }
    //   );

    //     this.countryService.getCountry()
    //       .subscribe( res => {
    //         console.log(res);
    //         let response = res;
    //         this.Countries = res;
    //         this.country =  JSON.stringify(this.Countries.response.country);
    //         this.regions =  JSON.stringify(this.Countries.response.country.regions);
    //         console.log('RES--COUNTRY-RESPONSE --> ' , JSON.stringify(this.Countries.response.country.name));
    //         console.log('RES--COUNTRY-RESPONSE --> ' ,  this.regions);
    // /** COUNTRY id -> region country ID */
    // });

    this.affiliate = this.userService.getUserValue();
    console.log('welcome->', this.affiliate);

    this.initWelcomeForm();

    this.initinvoiceForm();

    this.onChangesCheck();

    this.onChangeCountry();
  }



  initWelcomeForm() {
    this.welcomeForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      countryCode: [null, Validators.required],
      regionCode: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]*$")]],
      acccept: [false, Validators.required],
      showBilling: [false, ''],

    });

    this.welcomeForm.patchValue({
      name: this.affiliate.name ? this.affiliate.name : '',
      surname: this.affiliate.surname ? this.affiliate.surname : ''
    });


  }

  get welcomeControl() {
    return this.welcomeForm.controls;
  }

  onSubmit() {

    this.setAffilitePersonalData();
    console.log(this.setAffilitePersonalData());

    // this.affiliatesService.updatePersonalData(this.affiliate.id, this.personalData)
    //   .subscribe(res => {
    //     if (res.success) {

    //       console.log(res.data);

    //     } else {
    //       console.log(res.errorMsg);
    //     }
    //   }
    //   );

  }

  setAffilitePersonalData() {
    const countryData = this.welcomeForm.get('countryCode').value;
    const arrayCountry = countryData.split(',');
    return this.personalData = {
      dni: this.welcomeForm.get('dni').value,
      address: this.welcomeForm.get('address').value,
      countryCode: arrayCountry[4],
      regionCode: this.welcomeForm.get('regionCode').value,
      postalCode: this.welcomeForm.get('postalCode').value,
      phone: this.welcomeForm.get('phone').value,
    };

  }


  onShowInvoiceForm() {
    return this.welcomeForm.get('showBilling').value;
  }

  onChangesCheck(): void {
    this.welcomeForm.get('showBilling').valueChanges
      .subscribe(value => {

        this.bindPersonalDataToInvoice();
        // TODO:
      });
  }

  onChangeCountry() {
    this.welcomeForm.get('countryCode').valueChanges
      .subscribe(value => {
        console.log(value);
        let arrayValue = value.split(',');
        console.log(arrayValue);
        this.prefixCountry = arrayValue[2];
        console.log('this.prefixCountry', this.prefixCountry);
        let idCountry = Number(arrayValue[1]);
        let index = Number(arrayValue[3]);
        console.log(idCountry);
        console.log(index);
        // console.log('countries', this.countries[index].regions);
        // console.log('onFilterCountry->', this.onFilterCountry(index));
        this.onFilterCountry(index);
        // this.regions = this.onFilterCountry(index, idCountry);
        console.log(this.regions);
        console.log('onfilterCountryByID', this.onfilterCountryByID(idCountry));


      });
  }

  onFilterCountry(index: number) {
    // return this.regions = this.countries[index].regions;

  }

  onfilterCountryByID(id: number) {

    let data = [];
    return data = this.countries.filter(c => c.id === id)
  }


  // onChangesCountries(id: number) {
  //   return this.countries.regions.filter(value => value.countryId === id);
  // }

  // *********** TODO: INVOICE

  initinvoiceForm() {
    this.invoiceForm = this.fb.group({
      companyType: [null, Validators.required],
      companyName: ['', Validators.required],
      cif: ['', Validators.required],
      invoiceAddress: ['', Validators.required],
      invoiceCountryCode: [null, Validators.required],
      invoiceRegionCode: ['', Validators.required],
      invoicePostalCode: ['', Validators.required],
      invoicePhone: ['', Validators.required],
      iban: ['', Validators.required],
    });

  }

  onSubmitBilling() {
    this.setAffiliateInvoiceData();

    console.log(' setAffiliateInvoiceData()->', this.setAffiliateInvoiceData());
    console.log(' this.affiliate.id->', this.affiliate.id);

    // this.affiliatesService.updateInvoiceData(this.affiliate.id, this.affiliateInvoiceData)
    //   .subscribe(res => {
    //     if (res.success) {

    //       console.log(res.data);

    //     } else {
    //       console.log(res.errorMsg);
    //     }
    //   });


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

  bindPersonalDataToInvoice() {

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


 // this.countryService.getLocalJson()
    //   .subscribe(data => {

    //     console.log('---> data', data);

    //     const countriesData = data[0].response;
    //     console.log('countriesData-->', countriesData);

    //     this.countries = countriesData.map(c => c.country);

    //     console.log('countries', this.countries);
    //     // console.log('regions', this.regions);
    //   });
