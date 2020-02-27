import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Affiliate } from 'src/app/models/affiliate';
import { PersonalData } from 'src/app/models/personal-data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AffiliatesService } from 'src/app/services/affiliates.service';
import { Country } from 'src/app/models/country';
import { Region } from 'src/app/models/region';
import { BehaviorSubject } from 'rxjs';
import { SharePersonalData } from 'src/app/models/share-personal-data';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit, OnChanges {

  private countriesData = new BehaviorSubject<Country[]>([]);
  @Input() set countries(countries: Country[]) {
    this.countriesData.next(countries);
  }

  get countries() {
    return this.countriesData.getValue();
  }

  @Input() user: BehaviorSubject<Affiliate>;
  @Input() sharePersonalData: boolean;
  @Input() showPrivacyPolicy: boolean;
  @Output() sendPersonalData = new EventEmitter<any>();
  // solo test
  @Input() isFirstVisit: boolean;
  //
  @Input() affiliateData: Affiliate;


  welcomeForm: FormGroup;
  affiliate: Affiliate;
  personalData: PersonalData = new PersonalData();
  regions: Region[] = [];
  prefixCountry = '';
  showCompanytype = false;

  constructor(private userService: UserService<Affiliate>,
    private fb: FormBuilder,
    private affiliatesService: AffiliatesService) { }

  ngOnInit() {
    // this.initWelcomeForm();
    // this.onChangeCheck();
    // // this.affiliate.FirstVisit
    // this.loadAffiliatePersonalData(this.isFirstVisit);
    this.initWelcomeForm();
    this.onChangeCheck();
  }

  ngOnChanges(SimpleChanges): void {
    // if (this.user) {
    console.log(SimpleChanges);
    console.log('SimpleChanges.countries.firstChange', SimpleChanges.countries.firstChange);
    // }
    this.affiliate = this.user.getValue();
    if (!SimpleChanges.countries.firstChange) {
      // this.affiliate.FirstVisit
      this.loadAffiliatePersonalData(this.isFirstVisit);
    }
  }
  /*countries: SimpleChange
  previousValue: undefined
  currentValue: []
  firstChange: true
   2DA VEZ
  countries: SimpleChange
  previousValue: []
  currentValue:(251)[*
      firstChange: false
    }
  
  */
  initWelcomeForm() {
    this.welcomeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      surname: ['', [Validators.required, Validators.maxLength(100)]],
      nationality: [null, [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      address: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(300)]],
      countryCode: [null, Validators.required],
      regionCode: ['53', Validators.required],
      postalCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]*$'), Validators.maxLength(15)]],
      accept: [false, Validators.required],
      showInvoice: [false, ''],
    });


  }


  get welcomeControl() {
    return this.welcomeForm.controls;
  }

  onSubmitPersonalData() {
    this.getFormPersonalData();

    this.affiliatesService.updatePersonalData(this.affiliate.id, this.personalData)
      .subscribe(res => {
        if (res.success) {
          this.affiliate.personalData = this.personalData;
          this.userService.setUserData(this.affiliate);
        }
      });
  }

  getFormPersonalData(): PersonalData {
    return this.personalData = {
      nationality: this.welcomeForm.get('nationality').value,
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
        if (value >= 1) {
          this.sendPersonalData.emit(this.bindPersonalDataToInvoice());
        } else {
          this.sendPersonalData.emit(null);
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

  bindPersonalDataToInvoice(): SharePersonalData {
    const personalData: SharePersonalData = {
      prefixCountry: this.prefixCountry,
      invoiceData: {
        companyType: 1,
        companyName: this.affiliate.name + ' ' + this.affiliate.surname,
        cif: this.welcomeForm.get('dni').value,
        address: this.welcomeForm.get('address').value,
        countryCode: this.welcomeForm.get('countryCode').value,
        regionCode: this.welcomeForm.get('regionCode').value,
        postalCode: this.welcomeForm.get('postalCode').value,
        phone: this.welcomeForm.get('phone').value,
        iban: ''
      }
    };
    return personalData;
  }

  loadAffiliatePersonalData(firstVisit: boolean) {
    if (!firstVisit) {
      // this.setPersonalDataFormValue();
      this.TESTsetPersonalDataFormValue();
    } else {
      this.welcomeForm.patchValue({
        name: this.affiliate.name ? this.affiliate.name : '',
        surname: this.affiliate.surname ? this.affiliate.surname : '',
      });
    }
  }

  setPersonalDataFormValue() {
    const personalData = {
      name: this.affiliate.name ? this.affiliate.name : '',
      surname: this.affiliate.surname ? this.affiliate.surname : '',
      nationality: this.affiliate.personalData.nationality,
      dni: this.affiliate.personalData.dni,
      address: this.affiliate.personalData.address,
      countryCode: this.affiliate.personalData.countryCode,
      regionCode: this.affiliate.personalData.regionCode,
      postalCode: this.affiliate.personalData.postalCode,
      phone: this.affiliate.personalData.phone,
      accept: false,
      showInvoice: false
    };

    this.welcomeForm.setValue(personalData);
  }
  TESTsetPersonalDataFormValue() {
    const personalData = {
      name: this.affiliateData.name ? this.affiliateData.name : '',
      surname: this.affiliateData.surname ? this.affiliateData.surname : '',
      nationality: this.affiliateData.personalData.nationality,
      dni: this.affiliateData.personalData.dni,
      address: this.affiliateData.personalData.address,
      countryCode: this.affiliateData.personalData.countryCode,
      regionCode: '53',
      postalCode: this.affiliateData.personalData.postalCode,
      phone: this.affiliateData.personalData.phone,
      accept: false,
      showInvoice: false
    };

    this.welcomeForm.setValue(personalData);
  }

  setRegionsById(regionCode: string) {
    if (regionCode) {
      this.regions.filter(r => r.regionCode === regionCode)
        .map(co => {
          this.welcomeForm.patchValue({
            regionCode: this.affiliate.personalData.regionCode
          });
        });
    }
  }

}
