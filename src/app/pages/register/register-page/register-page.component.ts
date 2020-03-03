import { Component } from '@angular/core';
import { ExternalLayoutConfig } from '../../../models/config/external-layout-config';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Register } from 'src/app/models/register';
import { Affiliate } from 'src/app/models/affiliate';
import { CustomvalidationService } from '../../../validators/custom-validation.service';
import {AuthService} from '../../../services/auth.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  externalLayoutConfig: ExternalLayoutConfig = new ExternalLayoutConfig();
  titleCard = 'Crear nueva cuenta';
  registerForm: FormGroup;
  affiliate: Affiliate;

  register: Register;
  sendingForm = false;
  registerError = false;
  errorMessage = '';
  isCreatedAccount = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,
              private customValidator: CustomvalidationService) {

      this.externalLayoutConfig.isActiveLogoFooter = true;
      this.externalLayoutConfig.titlePosition = 'center';

      this.registerFormInit();
  }

  get registerControl() {
      return this.registerForm.controls;
  }
  private getEmail() {
      return this.registerForm.get('email').value;
  }
  private getName() {
      return this.registerForm.get('name').value;
  }
  private getSurName() {
      return this.registerForm.get('surName').value;
  }
  private getPassword() {
      return this.registerForm.get('password').value;
  }
  private getConfirmPassword() {
      return this.registerForm.get('confirmPassword').value;
  }

  onSubmit() {
    this.registerUser();
  }

  private registerUser() {
    this.sendingForm = true;
    this.errorMessage = '';
    this.authService.register(this.setRegisterData())
      .subscribe(res => {
        if (res.success ) {
          this.affiliate = res.data;
          this.sendingForm = false;
          this.registerError = false;
          this.isCreatedAccount = true;
        } else {
          this.showtErrorMessage();
        }
      }, error => {
          this.showtErrorMessage();
        }
      );
  }

  private setRegisterData() {
    return this.register = {
      email: this.getEmail(),
      name: this.getName(),
      surname: this.getSurName(),
      password: this.getPassword(),
      confirmPassword: this.getConfirmPassword()
    };
  }

  private registerFormInit() {
      this.registerForm = this.fb.group({
         email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
                      Validators.maxLength(100)]],
         name: ['', [Validators.required, Validators.maxLength(100)]],
         surName: ['', [Validators.required, Validators.maxLength(100)]],
         password: ['',
          Validators.compose([Validators.required, Validators.minLength(8),
              Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)])
         ],
         confirmPassword: ['', [Validators.required]],
         checkCondition: ['', Validators.required]
      }, { validator: this.customValidator.MustMatch('password', 'confirmPassword') });
  }

  showtErrorMessage() {
    this.registerError = true;
    this.sendingForm = false;
    this.errorMessage = 'Error al crear la cuenta, inténtelo de nuevo más tarde';
  }

    emailForward() {
      setTimeout( () => this.authService.registerEmailForward(this.getEmail()).subscribe(), 2000);
    }
}

