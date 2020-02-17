import { Injectable } from '@angular/core';
import {
   HttpInterceptor,
   HttpRequest,
   HttpHandler,
   HttpEvent, HttpErrorResponse,
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {JwtService} from '../services/jwt.service';
import {parse} from 'url';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {environment} from '../../environments/environment';

@Injectable() export class JwtInterceptor implements HttpInterceptor {

   private readonly jwtConfig = environment.jwt;
   private whitelistedDomains: Array<string | RegExp>;
   private blacklistedRoutes: Array<string | RegExp>;

   constructor(private router: Router, private jwt: JwtService, private authService: AuthService) {
      this.whitelistedDomains = this.jwtConfig.whiteListedDomains;
      this.blacklistedRoutes = this.jwtConfig.blackListedRoutes;
   }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (!this.isWhitelistedDomain(request) || this.isBlacklistedRoute(request)) {
         const token = this.jwt.getAccessToken();
         if (token) {
            request = request.clone({
               setHeaders: {
                  Authorization: `Bearer ${token}`
               }
            });
         }
      }
      return next.handle(request).pipe(catchError(error => this.handleAuthError(error)));
   }

   private isWhitelistedDomain(request: HttpRequest<any>): boolean {
      const requestUrl: any = parse(request.url, false, true);
      return (requestUrl.host === null || this.whitelistedDomains.findIndex(domain =>
                        typeof domain === 'string'
                              ? domain === requestUrl.host
                              : domain instanceof RegExp
                              ? domain.test(requestUrl.host)
                              : false
            ) > -1
      );
   }

   private isBlacklistedRoute(request: HttpRequest<any>): boolean {
      const url = request.url;
      return (this.blacklistedRoutes.findIndex(route =>
                        typeof route === 'string'
                              ? route === url
                              : route instanceof RegExp
                              ? route.test(url)
                              : false
            ) > -1
      );
   }

   private handleAuthError(error: HttpErrorResponse): Observable<any> {
      if (error.status === 401 || error.status === 403) {
         this.authService.logout();
      }
      return throwError(error);
   }
}
