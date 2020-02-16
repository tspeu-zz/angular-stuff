import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResponse} from '../models/response/login-response';
import {Router} from '@angular/router';
import {ResponseBody} from '../models/response/response-body';
import {JwtService} from './jwt.service';
import { ResetPassword } from '../models/reset-password.model';
import {Register} from '../models/register.model';
import {Affiliate} from '../models/affiliate';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private readonly authPath = environment.affiliatesApiUrl + 'auth';

   httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json'
      })
   };

   constructor(private http: HttpClient, private router: Router, private jwtService: JwtService) { }

   login(codeOrEmail: string, password: string): Observable<ResponseBody<LoginResponse>> {
      return this.http.post<ResponseBody<LoginResponse>>(this.authPath + '/login', { codeOrEmail, password }, this.httpOptions);
   }

   logout(): void {
      this.jwtService.removeToken();
      this.router.navigate(['/login']);
   }

   isAuthenticated(): boolean {
      return this.jwtService.getAccessToken() != null;
   }

   register(register: Register): Observable<ResponseBody<Affiliate>> {
      return this.http.post<ResponseBody<Affiliate>>(this.authPath + '/register', register, this.httpOptions);
   }

   recoverAccount(email: string): Observable<ResponseBody<boolean>> {
      return this.http.post<ResponseBody<boolean>>(this.authPath + '/recoverPassword', email, this.httpOptions);
   }

   resetPassword(resetPassword: ResetPassword): Observable<ResponseBody<boolean>> {
      return this.http.post<ResponseBody<boolean>>(this.authPath + '/ResetPassword', resetPassword, this.httpOptions);
   }

   confirmEmail(token: string): Observable<ResponseBody<string>> {
      return this.http.post<ResponseBody<string>>(this.authPath + '/confirmEmail', `"${token}"`, this.httpOptions);
   }

}
