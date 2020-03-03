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
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit, OnChanges {

  // private countriesData = new BehaviorSubject<Country[]>([]);
  // @Input() set countries(countries: Country[]) {
  //   this.countriesData.next(countries);
  // }

  // get countries() {
  //   return this.countriesData.getValue();
  // }
  @Input() countriesInput: BehaviorSubject<Country[]>;
  countries: Country[] = [];
  @Input() paises: Country[];

  @Input() user: BehaviorSubject<Affiliate>;
  @Input() sharePersonalData: boolean;
  @Input() showPrivacyPolicy: boolean;
  @Output() sendPersonalData = new EventEmitter<SharePersonalData>();
  @Output() stepperFoward = new EventEmitter<boolean>();
  @Output() isFormValid = new EventEmitter<boolean>();

  welcomeForm: FormGroup;
  affiliate: Affiliate;
  personalData: PersonalData = new PersonalData();
  regions: Region[] = [];
  prefixCountry = '';
  showCompanytype = false;
  labelSaveButton = 'Continuar';

  constructor(private userService: UserService<Affiliate>,
    private fb: FormBuilder,
    private affiliatesService: AffiliatesService) {
    this.initWelcomeForm();
  }

  ngOnInit() {
    this.onChangeCheck();
    this.onChangeForm();
    console.log(this.countries);
    console.log(this.countriesInput);
  }

  ngOnChanges(SimpleChanges) {
    console.log(SimpleChanges);
    if (this.user) {
      this.affiliate = this.user.getValue();
    }
    console.log(this.countries);
    console.log(this.countriesInput);
    if (SimpleChanges.countriesInput && SimpleChanges.countriesInput.currentValue.length > 0) {
      console.log(this.countriesInput);
      // this.loadAffiliatePersonalData(this.affiliate.firstVisit);
    }

    if (SimpleChanges.paises && SimpleChanges.paises.currentValue.length > 0) {
      this.countries = this.paises;
      console.log(this.paises);
      this.loadAffiliatePersonalData(this.affiliate.firstVisit);

    }

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

  initWelcomeForm(): void {
    this.welcomeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      surname: ['', [Validators.required, Validators.maxLength(100)]],
      nationality: [null, [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      address: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(300)]],
      countryCode: [null, Validators.required],
      regionCode: [null, Validators.required],
      postalCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]*$'), Validators.maxLength(15)]],
      accept: [false, Validators.required],
      showInvoice: [false, ''],
    });

  }

  onChangeForm() {
    this.welcomeForm.statusChanges.subscribe(
      newStatus => {
        newStatus !== 'INVALID' ? this.isFormValid.emit(true) : this.isFormValid.emit(false);
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
          if (this.affiliate.firstVisit) {
            this.stepperFoward.emit(true);
          }
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
      name: this.welcomeForm.get('name').value,
      surname: this.welcomeForm.get('surname').value
    };
  }



  setRegionsByCountry(countryCode: string): void {
    this.countries.filter(c => c.isoCode === countryCode)
      .map(co => {
        this.regions = co.regions;
        this.prefixCountry = this.formatPrefixNumber(co.phone);

        this.setPostalCodeValidatorByCountry(co.postalCodeRegex);
      });
  }

  setPostalCodeValidatorByCountry(regexPostalCode: string): void {
    const postalCodeControl = this.welcomeForm.get('postalCode');
    if (regexPostalCode !== null) {
      postalCodeControl.setValidators([Validators.pattern(regexPostalCode), Validators.required]);
    } else {
      postalCodeControl.setValidators([Validators.required, Validators.minLength(3)]);
    }
    postalCodeControl.updateValueAndValidity();

    this.welcomeForm.patchValue({ regionCode: null });
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

  loadAffiliatePersonalData(firstVisit: boolean): void {
    if (!firstVisit) {
      this.setPersonalDataFormValue();
    } else {
      this.welcomeForm.patchValue({
        name: this.affiliate.name ? this.affiliate.name : '',
        surname: this.affiliate.surname ? this.affiliate.surname : '',
      });
    }
    this.setButtonLabel(firstVisit);
  }

  setPersonalDataFormValue(): void {
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

  setButtonLabel(isWelcomePage: boolean) {
    this.labelSaveButton = isWelcomePage ? 'Continuar' : 'Guardar';
  }

}
