import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecoverAccountService {

  emailUser = '';

  constructor() { }

  setEmailUser(email: string) {
    this.emailUser = email;
  }

  getEmailUser() {
    return this.emailUser;
  }

}
