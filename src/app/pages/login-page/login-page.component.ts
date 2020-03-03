import { Component, OnInit } from '@angular/core';
import { ExternalLayoutConfig } from '../../models/config/external-layout-config';
import { AuthService } from '../../services/auth.service';
import { JwtService } from '../../services/jwt.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AffiliatesService } from '../../services/affiliates.service';
import { RecoverAccountService } from 'src/app/services/recover-account.service';
import { CustomvalidationService } from 'src/app/validators/custom-validation.service';
import { UserService } from '../../services/user.service';
import { Affiliate } from '../../models/affiliate';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  externalLayoutConfig: ExternalLayoutConfig = new ExternalLayoutConfig();
  loginForm: FormGroup;
  errorLogin = false;
  errorMessage = '';
  private readonly keyLocalStorage = 'user_credential';
  affiliate: Affiliate;

  constructor(private authService: AuthService, private jwt: JwtService, private router: Router, private formBuilder: FormBuilder,
    private affiliatesService: AffiliatesService, private recoverService: RecoverAccountService,
    private customValidator: CustomvalidationService, private userService: UserService<Affiliate>) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  onSubmit() {
    this.authService.login(this.getUserCodeOrEmail(), this.getPassword()).subscribe(response => {
      if (response.success) {
        this.saveUserCodeOrEmail();
        this.jwt.setAccessToken(response.data.token);
        this.userService.setUserData(response.data.affiliate);

        this.affiliate = this.userService.getUserValue();
        this.affiliate.personalData = {
          nationality: 'ES',
          dni: 'C11111111D',
          address: 'calle vieja 500, 1ro 2da.',
          countryCode: 'ES',
          regionCode: '53',
          postalCode: '90001',
          phone: '444444',
        };
        this.affiliate.invoiceData = {
          companyType: 0,
          companyName: 'ACME INC.',
          cif: '0000001234',
          address: 'AV. nueva 100',
          countryCode: 'ES',
          regionCode: '07',
          postalCode: '91001',
          phone: '111111',
          iban: 'ES1234567890123456789012',
        };
        this.affiliate.firstVisit = false;

        console.log('this.affiliate', this.affiliate);




        this.router.navigate(['/bienvenida']);
        // if (this.affiliate.firstVisit) {
        //   this.router.navigate(['/bienvenida']);
        // } else {
        //   this .router.navigate(['/']);
        // }
      } else {
        this.showtErrorMessage();
      }
    }, error => {
      this.showtErrorMessage();
    });
  }

  get loginControls() {
    return this.loginForm.controls;
  }

  private getPassword() {
    return this.loginForm.get('password').value;
  }

  private getUserCodeOrEmail() {
    return this.loginForm.get('codeOrEmail').value;
  }

  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      codeOrEmail: ['', [Validators.required]],
      password: ['', Validators.required],
      checkRemember: ['']
    });

    if (this.checkLocalStorage()) {
      this.loginForm.patchValue({ codeOrEmail: localStorage.getItem(this.keyLocalStorage) });
      this.loginForm.patchValue({ checkRemember: true });
    }

    this.emailControl();
  }

  private getCheckSession() {
    return this.loginForm.get('checkRemember').value;
  }

  emailControl() {
    const emailControl = this.loginForm.controls.codeOrEmail;
    emailControl.valueChanges.subscribe(() => {
      if (emailControl.value === '') {
        emailControl.setValidators = null;
        this.errorLogin = false;
      }
    });
  }

  private cleanLocalCredential() {
    localStorage.removeItem(this.keyLocalStorage);
  }

  private checkLocalStorage() {
    return localStorage.getItem(this.keyLocalStorage) !== null;
  }

  setUserEmail() {
    this.recoverService.setEmailUser(this.getUserCodeOrEmail());
  }

  saveUserCodeOrEmail(): void {
    this.errorLogin = false;
    if (this.getCheckSession()) {
      localStorage.setItem(this.keyLocalStorage, this.getUserCodeOrEmail());
    } else {
      this.cleanLocalCredential();
    }
  }

  showtErrorMessage(): void {
    this.errorLogin = true;
    this.errorMessage = 'Usuario o contraseña incorrectos';
  }

}
