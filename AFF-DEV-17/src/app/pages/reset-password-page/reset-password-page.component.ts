import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ExternalLayoutConfig } from 'src/app/models/config/external-layout-config';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from 'src/app/providers/custom-validation.service';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPassword } from '../../models/reset-password.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {

  externalLayoutConfig: ExternalLayoutConfig = new ExternalLayoutConfig();
  titleCard = 'Establecer una nueva contraseña';

  resetPasswordForm: FormGroup;
  resetPassword: ResetPassword;
  userToken: string;
  confirmPasswordError = false;
  errorResponse = false;
  errorMessage = '';
  resetSendOk = false;

  constructor(private fb: FormBuilder,
              private customValidator: CustomvalidationService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) {

    this.externalLayoutConfig.titlePosition = 'center';
    this.externalLayoutConfig.isActiveLogoFooter = true;

  }
  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
          this.userToken = params.token;
    });

    this.initFormResetPassword();
  }

  onSubmit() {

    this.errorMessage = '';
    this.authService.resetPassword(this.setUserResetPassword())
    .subscribe( res => {
        if (res.success) {
          if (res.data) {

            this.resetSendOk = true;
          } else {

            this.setErrorMessage();
          }
        } else {

          this.setErrorMessage();
        }
      },
      error => {
        this.setErrorMessage();

      }
    );

  }

  get recoverControl() {
    return this.resetPasswordForm.controls;
  }

  private getPassword() {
    return this.resetPasswordForm.get('password').value;
  }

  private getConfirmPassword() {
    return this.resetPasswordForm.get('confirmPassword').value;
  }

  private setUserResetPassword() {
    return this.resetPassword = {
      password: this.getPassword(),
      confirmPassword: this.getConfirmPassword(),
      token: this.userToken
    };
  }

  private passwordControl() {
    const passControl =  this.resetPasswordForm.controls.confirmPassword;
    passControl.valueChanges.subscribe(() => {
      if (passControl.value === '' ) {
        this.confirmPasswordError = true;
      }
    });
  }

  initFormResetPassword() {
    this.resetPasswordForm = this.fb.group({
      password: ['',
        Validators.compose([Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)])
      ],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validator: this.customValidator.MustMatch('password', 'confirmPassword')
      }
    );
    this.passwordControl();
  }

  setErrorMessage() {
    this.resetSendOk = false;
    this.errorResponse = true;
    this.errorMessage = 'Error al crear nueva contraseña, inténtelo de nuevo más tarde';
  }

}
