import { Component, OnInit } from '@angular/core';
import { ExternalLayoutConfig } from '../../models/config/external-layout-config';
import { AuthService } from '../../services/auth.service';
import { JwtService } from '../../services/jwt.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AffiliatesService } from '../../services/affiliates.service';
import { RecoverAccountService } from 'src/app/services/recover-account.service';
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
              private userService: UserService<Affiliate>) { }

  ngOnInit(): void {
    this.createLoginForm() ;
  }

  onSubmit() {
    this.authService.login(this.getUserCodeOrEmail(), this.getPassword()).subscribe(response => {
      if (response.success) {
        this.saveUserCodeOrEmail();
        this.jwt.setAccessToken(response.data.token);
        this.userService.setUserData(response.data.affiliate);

        this.affiliate = this.userService.getUserValue();

        this.affiliatesService.getByCode( this.affiliate.code)
          .subscribe(resp => {
            if (resp.success) {
              this.userService.setUserData(resp.data);
            }
        });

        if (this.affiliate.firstVisit) {
          this.router.navigate(['/bienvenida']);
        } else {
          this .router.navigate(['/']);
        }
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
      password: ['', [Validators.required, Validators.minLength(8)]],
      checkRemember: ['']
    });

    if (this.checkLocalStorage()) {
      this.loginForm.patchValue({ codeOrEmail: localStorage.getItem(this.keyLocalStorage) });
      this.loginForm.patchValue({checkRemember : true});
    }

    this.emailControl() ;
  }

  private getCheckSession() {
    return this.loginForm.get('checkRemember').value;
  }

  emailControl() {
    const emailControl =  this.loginForm.controls.codeOrEmail;
    emailControl.valueChanges.subscribe(() => {
      if (emailControl.value === '' ) {
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
      localStorage.setItem(this.keyLocalStorage,  this.getUserCodeOrEmail());
    } else {
      this.cleanLocalCredential();
    }
  }

  showtErrorMessage(): void {
    this.errorLogin = true;
    this.errorMessage = 'Usuario o contraseña incorrectos';
  }

}
