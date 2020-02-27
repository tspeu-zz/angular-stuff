import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {JwtService} from '../services/jwt.service';
// import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

   constructor(private router: Router, private authService: AuthService, private jwtService: JwtService
              ) {}

   canActivate(): boolean {
      if (!this.authService.isAuthenticated()) {
         this.router.navigate(['/login']);
         return false;
      } else {
         return true;
      }
   }
}
