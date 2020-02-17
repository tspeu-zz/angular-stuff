import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

   setAccessToken(token: string) {
      localStorage.setItem('access_token', token);
   }

   getAccessToken(): string {
     return localStorage.getItem('access_token');
   }

   removeToken(): void {
      localStorage.removeItem('access_token');
   }
}
