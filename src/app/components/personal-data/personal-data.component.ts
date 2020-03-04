import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Affiliate } from 'src/app/models/affiliate';
import { PersonalData } from 'src/app/models/personal-data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AffiliatesService } from 'src/app/services/affiliates.service';
import { GeoCountry } from 'src/app/models/geo-country';
import { Region } from 'src/app/models/region';
import { SharePersonalData } from 'src/app/models/share-personal-data';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit, OnChanges {

  @Input() countries: GeoCountry[] = [];
  @Input() user: Affiliate;
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
    console.log('init');
  }

  ngOnInit() {
    this.onChangeCheck();
    this.onChangeForm();

    console.log('init');
  }

  ngOnChanges(SimpleChanges) {
    console.log(SimpleChanges);
    if (this.user) {
      this.affiliate = this.user;
      // this.setRegionsByCountry(this.affiliate.personalData.countryCode);
    }

    if (SimpleChanges.countries && SimpleChanges.countries.currentValue.length > 0) {
      this.loadAffiliatePersonalData(this.affiliate.firstVisit);
      this.countries.filter(c => c.isoCode === this.affiliate.personalData.countryCode)
        .map(co => {
          this.regions = co.regions;
          this.prefixCountry = this.formatPrefixNumber(co.phone);

          this.setPostalCodeValidatorByCountry(co.postalCodeRegex);
        });
      this.welcomeForm.patchValue({ regionCode: this.affiliate.personalData.regionCode });

    }
    console.log(SimpleChanges);
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

    if (this.affiliate.firstVisit) {
      this.affiliate.personalData = this.personalData;
      this.userService.setUserData(this.affiliate);
      this.stepperFoward.emit(true);
      console.log('->BIENVENIDA->', this.affiliate);
    } else {
      this.affiliatesService.updatePersonalData(this.affiliate.id, this.personalData)
        .subscribe(res => {
          if (res.success) {
            this.affiliate.personalData = this.personalData;
            this.userService.setUserData(this.affiliate);
            console.log('->PERFIL->', this.affiliate);
          }
        });
    }
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
