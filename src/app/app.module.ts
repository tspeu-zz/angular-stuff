import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

// components

import { ExternalLayoutComponent } from './shared/layouts/external-layout/external-layout.component';
import { BaseLayoutComponent } from './shared/layouts/base-layout/base-layout.component';
import { AccountCreatedPageComponent } from './pages/register/account-created-page/account-created-page.component';
import { ExternalCardComponent } from './components/external-card-component/external-card.component';


// pages
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RecoverAccountPageComponent } from './pages/recover-account-page/recover-account-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { AccountActivatedPageComponent } from './pages/register/account-activated-page/account-activated-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

// interceptors
import {JwtInterceptor} from './interceptors/jwt-interceptor.service';
import {AppInitService} from './services/app-init.service';
import { NavHeaderComponent } from './shared/header/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IconsMenuComponent } from './shared/header/icons-menu/icons-menu.component';
import { SideNavComponent } from './shared/header/side-nav/side-nav.component';
import { LinksMenuComponent } from './shared/header/links-menu/links-menu.component';
import { LinksService } from './mocks/links.service';
import { DropDownService } from './mocks/drop-down.service';
import { IconsService } from './mocks/icons.service';

// initialize app
export function initializeApp(appInitService: AppInitService) {
   return (): Promise<any> => {
      return appInitService.Init();
   };
}

@NgModule({
   declarations: [
      AppComponent,
      ExternalCardComponent,
      LoginPageComponent,
      ExternalLayoutComponent,
      BaseLayoutComponent,
      RegisterPageComponent,
      HomePageComponent,
      NavHeaderComponent,
      FooterComponent,
      SideNavComponent,
      LinksMenuComponent,
      IconsMenuComponent,
      AccountCreatedPageComponent,
      AccountActivatedPageComponent,
      RecoverAccountPageComponent,
      ResetPasswordPageComponent,
      WelcomePageComponent,

   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      MDBBootstrapModule.forRoot(),
      HttpClientModule,
      ReactiveFormsModule
   ],
   providers: [
      AppInitService,
      LinksService,
      DropDownService,
      IconsService,
      { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ AppInitService ], multi: true},
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
   ],

   bootstrap: [AppComponent]
})
export class AppModule { }
