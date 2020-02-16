import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseLayoutComponent } from './shared/layouts/base-layout/base-layout.component';

import {AuthGuard} from './guards/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AccountCreatedPageComponent } from './pages/register/account-created-page/account-created-page.component';
import { AccountActivatedPageComponent } from './pages/register/account-activated-page/account-activated-page.component';
import { RecoverAccountPageComponent } from './pages/recover-account-page/recover-account-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';



const routes: Routes = [
    { path: '', component: BaseLayoutComponent, canActivate: [ AuthGuard ],
        children: [
            { path: '', component: HomePageComponent },
            { path: 'bienvenida', component: WelcomePageComponent },
        ]
    },
    { path: 'login', component: LoginPageComponent },
    { path: 'registrarse', component: RegisterPageComponent },
    { path: 'cuenta-creada', component: AccountCreatedPageComponent },
    { path: 'activar-cuenta/:token', component: AccountActivatedPageComponent },
    { path: 'recuperar-cuenta', component: RecoverAccountPageComponent },
    { path: 'cambiar-credenciales/:token', component: ResetPasswordPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
