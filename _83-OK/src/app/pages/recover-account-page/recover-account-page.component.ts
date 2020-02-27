import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExternalLayoutConfig } from 'src/app/models/config/external-layout-config';
import { RecoverAccountService } from 'src/app/services/recover-account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account-page.component.html',
  styleUrls: ['./recover-account-page.component.scss']
})
export class RecoverAccountPageComponent implements OnInit {


  externalLayoutConfig: ExternalLayoutConfig = new ExternalLayoutConfig();
  titleCard = 'Recuperar cuenta';
  recoverForm: FormGroup;
  recoverEmail: string;
  errorSendEmail = false;
  mailSendOk = false;
  errorMessage = '';
  isLoading = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private recoverService: RecoverAccountService) {
    this.externalLayoutConfig.titlePosition = 'center';
    this.externalLayoutConfig.isActiveLogoFooter = true;
  }

  ngOnInit() {

    this.initFormRecoverAccount();

  }


  onSubmit() {

    this.isLoading =  true;

    this.authService.recoverAccount(JSON.stringify(this.getActualUserEmail()))
    .subscribe(res => {
        if (res.success) {

            this.mailSendOk = res.data;
            this.isLoading =  false;
            this.errorSendEmail = false;

        } else {

          this.setErrorMessage();
        }
      }, error => {

        this.setErrorMessage();
    });
  }

  get registerControl() {
    return this.recoverForm.controls;
  }

  private verifiedEmailUser(): void {
    this.recoverEmail =  this.recoverService.getEmailUser() ? this.recoverService.getEmailUser() : '' ;
  }

  private getActualUserEmail() {
    return this.recoverForm.get('email').value;
  }

  emailControl() {
    const emailControl =  this.recoverForm.controls.email;
    emailControl.valueChanges.subscribe(() => {
      if (emailControl.value === '' ) {
        emailControl.setValidators = null;
        this.errorSendEmail = false;
      }
    });
  }

  initFormRecoverAccount() {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]]
    });

    this.verifiedEmailUser();
    this.recoverForm.patchValue({email: this.recoverEmail });
    this.emailControl();
  }

  setErrorMessage() {
    this.mailSendOk = false;
    this.isLoading =  false;
    this.errorSendEmail = true;
    this.errorMessage =  'Error de conexión, inténtelo de nuevo más tarde';
  }

}
