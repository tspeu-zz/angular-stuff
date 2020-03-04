import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ResponseBody} from '../models/response/response-body';
import {ClientInfo} from '../models/client-info';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  private apiUrl = environment.courseApi + 'localization';
  private userCountryCode: string;

  constructor(private http: HttpClient) { }

  getClientInfo(): Observable<ResponseBody<ClientInfo>> {
    return this.http.get<ResponseBody<ClientInfo>>(this.apiUrl + '/clientinfo');
  }

  getUserCountryCode(): string {
    return this.userCountryCode;
  }

  setUserCountryCode(countryCode: string) {
    this.userCountryCode = countryCode;
  }
}
