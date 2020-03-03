import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private readonly accessToken = 'access_token';

  constructor() { }

   setAccessToken(token: string) {
      localStorage.setItem(this.accessToken, token);
   }

   getAccessToken(): string {
     return localStorage.getItem(this.accessToken);
   }

   removeToken(): void {
      localStorage.removeItem(this.accessToken);
   }
}
