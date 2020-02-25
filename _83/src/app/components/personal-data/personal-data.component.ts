import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Affiliate } from 'src/app/models/affiliate';
import { PersonalData } from 'src/app/models/personal-data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AffiliatesService } from 'src/app/services/affiliates.service';
import { Country } from 'src/app/models/country';
import { Region } from 'src/app/models/region';
// import { takeWhile } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.services';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit, OnChanges {


  private _countries = new BehaviorSubject<Country[]>([]);
  @Input() set countries(countries: Country[]) {
    this._countries.next(countries);
  };

  get countries() {
    return this._countries.getValue();
  };

  @Output() sharePersonalData = new EventEmitter<boolean>();

  _bindData = new BehaviorSubject<personalDataBind>(null);

  welcomeForm: FormGroup;
  affiliate: Affiliate;
  personalData: PersonalData = new PersonalData();
  paises: Country[] = [];
  regions: Region[] = [];
  prefixCountry = '';
  showCompanytype = false;




  constructor(private userService: UserService<Affiliate>,
    private fb: FormBuilder,
    private affiliatesService: AffiliatesService,
    private profileService: ProfileService<personalDataBind>) { }

  ngOnInit() {
    this.affiliate = this.userService.getUserValue();
    this.initWelcomeForm();

    this.onChangeCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {

    // this._countries
    //   .pipe(
    //     takeWhile(() => !this.paises)
    //   ).subscribe(x => {
    //     this.paises = this.countries;
    //     console.log('inputs--> PersonalDataComponent', this.countries);
    //     console.log('inputs--> PersonalDataComponent paises', this.paises);
    //   });

  }



  initWelcomeForm() {
    this.welcomeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      surname: ['', [Validators.required, Validators.maxLength(100)]],
      dni: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      address: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(300)]],
      countryCode: [null, Validators.required],
      regionCode: [null, Validators.required],
      postalCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]*$'), Validators.maxLength(15)]],
      accept: [false, Validators.required],
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

  onSubmitPersonalData() {
    this.setAffilitePersonalData();

    this.affiliatesService.updatePersonalData(this.affiliate.id, this.personalData)
      .subscribe(res => {
        if (res.success) {
          this.affiliate.personalData = this.personalData;
          this.userService.setUserData(this.affiliate);
        }
      });
  }

  setAffilitePersonalData(): PersonalData {
    return this.personalData = {
      dni: this.welcomeForm.get('dni').value,
      address: this.welcomeForm.get('address').value,
      countryCode: this.welcomeForm.get('countryCode').value,
      regionCode: this.welcomeForm.get('regionCode').value,
      postalCode: this.welcomeForm.get('postalCode').value,
      phone: this.welcomeForm.get('phone').value,
    };
  }

  onChangeCheck() {
    this.welcomeForm.get('showInvoice').valueChanges
      .subscribe(value => {
        if (value) {
          // this.bindPersonalDataToInvoice();
          // this.setCompanyName(false);
          this.sharePersonalData.emit(true);
          //this._bindData.next(this.bindPersonalDataToInvoice());
          this.profileService.setProfileData(this.bindPersonalDataToInvoice());

          console.log('emmit personalData');
          console.log(' personalData', this.bindPersonalDataToInvoice());
        } else {
          //   this.clearPersonalDataToInvoice();
          //   this.setCompanyName(true);
          this.sharePersonalData.emit(false);
          console.log('emmit clean personalData');

        }
      });
  }

  onChangeCountry(countryCode: string) {
    if (countryCode !== null) {
      this.setRegionsByCountry(countryCode);
      this.welcomeForm.get('regionCode').enable();

    } else {
      this.welcomeForm.get('regionCode').disable();
    }
  }

  setRegionsByCountry(countryCode: string) {
    if (countryCode) {
      this.countries.filter(c => c.isoCode === countryCode)
        .map(co => {
          this.regions = co.regions;
          this.prefixCountry = this.formatPrefixNumber(co.phone);

          const regexPostalCode = co.postalCodeRegex;
          const postalCode = this.welcomeForm.get('postalCode');
          if (regexPostalCode !== null) {
            postalCode.setValidators([Validators.pattern(regexPostalCode), Validators.required]);
          } else {
            postalCode.setValidators([Validators.required, Validators.minLength(3)]);
          }
          postalCode.updateValueAndValidity();

          this.welcomeForm.patchValue({ regionCode: '' });
        });
    }
  }

  formatPrefixNumber(prefixValue: string): string {

    return (prefixValue !== '-') ? '+' + prefixValue : '+' + prefixValue.slice(0);
  }

  bindPersonalDataToInvoice(): personalDataBind {
    let datos = new personalDataBind();
    return datos = {

      prefixCountryInvoice: this.prefixCountry,
      companyType: 0,
      companyName: this.affiliate.name + ' ' + this.affiliate.surname,
      cif: this.welcomeForm.get('dni').value,
      invoiceAddress: this.welcomeForm.get('address').value,
      invoiceCountryCode: this.welcomeForm.get('countryCode').value,
      invoiceRegionCode: this.welcomeForm.get('regionCode').value,
      invoicePostalCode: this.welcomeForm.get('postalCode').value,
      invoicePhone: this.welcomeForm.get('phone').value,

    }

    // dni: 
    // address: ,
    // countryCode: this.welcomeForm.get('countryCode').value,
    // regionCode: this.welcomeForm.get('regionCode').value,
    // postalCode: this.welcomeForm.get('postalCode').value,
    // phone: this.welcomeForm.get('phone').value,
    // this.prefixCountryInvoice = data.prefixCountry;
    // const name = this.affiliate.name;
    // const surName = this.affiliate.surname;
    // this.checkFreelanceType = true;
    // this.invoiceForm.patchValue({
    //   companyType: 1,
    //   companyName: name + ' ' + surName,
    //   cif: data.dni,
    //   invoiceAddress: data.address,
    //   invoiceCountryCode: data.countryCode,
    //   invoiceRegionCode: data.regionCode,
    //   invoicePostalCode: data.postalCode,
    //   invoicePhone: data.phone
    // });
  }

}


export class personalDataBind {
  prefixCountryInvoice = '';
  companyType = 0;
  companyName = '';
  cif = '';
  invoiceAddress = '';
  invoiceCountryCode = null;
  invoiceRegionCode = null;
  invoicePostalCode = '';
  invoicePhone = '';
};