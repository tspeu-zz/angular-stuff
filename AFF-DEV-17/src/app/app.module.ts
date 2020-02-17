import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatButtonModule, MatCheckboxModule, MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularIbanModule } from 'angular-iban';
// components

import { ExternalLayoutComponent } from './shared/layouts/external-layout/external-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { AccountCreatedPageComponent } from './pages/register/account-created-page/account-created-page.component';
import { ExternalCardComponent } from './components/external-card/external-card.component';


// pages
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RecoverAccountPageComponent } from './pages/recover-account-page/recover-account-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { AccountActivatedPageComponent } from './pages/register/account-activated-page/account-activated-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

// interceptors
import { JwtInterceptor } from './interceptors/jwt-interceptor.service';
import { AppInitService } from './services/app-init.service';
import { NavHeaderComponent } from './shared/header/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IconsMenuComponent } from './shared/header/icons-menu/icons-menu.component';
import { SideNavComponent } from './shared/header/side-nav/side-nav.component';
import { LinksMenuComponent } from './shared/header/links-menu/links-menu.component';
import { LinksService } from './mocks/links.service';
import { DropDownService } from './mocks/drop-down.service';
import { IconsService } from './mocks/icons.service';
import { CardComponent } from './components/card/card.component';
import { ResumeComponent } from '../app/components/resume/resume.component';
import { GraphComponent } from '../app/components/graph/graph.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export const MY_FORMATS = {
   parse: {
      dateInput: 'DD/MM/YYYY',
   },
   display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MM YYYY',
      dateA11yLabel: 'DD/MM/YYYY',
      monthYearA11yLabel: 'MM YYYY',
   },
};
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
      MainLayoutComponent,
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
      CardComponent,
      ResumeComponent,
      GraphComponent,
      WelcomePageComponent,

   ],
   imports: [
      BrowserModule,
      MatDatepickerModule,
      MatButtonModule,
      AppRoutingModule,
      MDBBootstrapModule.forRoot(),
      MatInputModule,
      MatTableModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      NgSelectModule,
      AngularIbanModule
   ],
   exports: [
      MatDatepickerModule,
      MatNativeDateModule,
   ],
   providers: [
      AppInitService,
      LinksService,
      DropDownService,
      IconsService,
      { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppInitService], multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: MAT_DATE_LOCALE, useValue: 'es' },
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
   ],

   bootstrap: [AppComponent]
})
export class AppModule { }
