import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Affiliate } from 'src/app/models/affiliate';
import { PersonalData } from 'src/app/models/personal-data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AffiliatesService } from 'src/app/services/affiliates.service';

@Component({
  selector: 'app-bienvenida-page',
  templateUrl: './bienvenida-page.component.html',
  styleUrls: ['./bienvenida-page.component.scss']
})
export class BienvenidaPageComponent implements OnInit {

  welcomeForm: FormGroup;
  affiliate: Affiliate;
  formActivate = false;
  personalData: PersonalData =  new PersonalData();

  constructor(private userService: UserService<Affiliate>,
              private fb: FormBuilder,
              private affiliatesService: AffiliatesService) { }


  ngOnInit() {

    this.affiliate = this.userService.getUserValue();
    console.log('welcome->', this.affiliate);


    this.initWelcomeForm();
  }

  initWelcomeForm() {

    this.welcomeForm = this.fb.group({
      name : ['', Validators.required],
      surname : ['', Validators.required],
      dni: ['', Validators.required],
      address: ['', Validators.required],
      countryCode: ['', Validators.required],
      regionCode: ['', Validators.required],
      postalCode: [''],
      phone: ['', Validators.required],
      acccept: [false, Validators.required],
      // useBilling: ['', Validators.required],

    });

    this.welcomeForm.patchValue({
          name: this.affiliate.name ,
          surname: this.affiliate.surname
        });

        // TODO:
    // if (this.affiliate.personalData !== null ) {
    //   this.welcomeForm.get('name').enable();
    //   this.welcomeForm.get('surname').enable();
    // } else {
    //   // this.welcomeForm.get('name').reset();
    //   this.welcomeForm.get('name').disable();
    //   this.welcomeForm.get('surname').disable();
    // }


  }

  get welcomeControl() {
    return this.welcomeForm.controls;
  }

  onSubmit() {

    this.setAffilitePersonalData();

    this.affiliatesService.updatePersonalData(this.affiliate.id , this.personalData)
      .subscribe(
          res => {
            if (res.success) {

              console.log(res.data);

            } else {
              console.log(res.errorMsg);
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
      } ;

  }




}

