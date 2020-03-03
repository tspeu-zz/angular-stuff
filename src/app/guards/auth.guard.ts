import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';
import { UserService } from '../services/user.service';
import { Affiliate } from '../models/affiliate';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  private readonly urlWelcomePage = '/bienvenida';
  private readonly userFirstLogin: boolean;

  constructor(private router: Router, private jwtService: JwtService, private userService: UserService<Affiliate>) {
    this.userFirstLogin = this.userService.getUserValue() ? this.userService.getUserValue().firstVisit : true;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    let isActive = false;
    if (this.jwtService.getAccessToken() == null) {
      this.router.navigate(['/login']);
    } else {
      isActive = true;
      if (state.url === this.urlWelcomePage && !this.userFirstLogin) {
        this.router.navigate(['/']);
      }
      if (state.url !== this.urlWelcomePage && this.userFirstLogin) {
        this.router.navigate([this.urlWelcomePage]);
      }
    }
    return isActive;
  }
}
