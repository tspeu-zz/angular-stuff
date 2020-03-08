import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService<T> {

  private user: BehaviorSubject<T> = new BehaviorSubject<T>(undefined);
  private userCountryCode: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  constructor() {
  }

  getUserData(): Observable<T> {
    return this.user;
  }

  setUserData(user: T) {
    this.user.next(user);
  }

  getUserValue(): T {
    return this.user.getValue();
  }

  getUserCountryCodeValue(): string {
    return this.userCountryCode.getValue();
  }

  setUserCountryCode(countryCode: string) {
    this.userCountryCode.next(countryCode);
  }

  getUserCountryCodeAsObservable(): Observable<string> {
    return this.userCountryCode;
  }
}
