import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register/register-page/register-page.component';
import { AccountCreatedPageComponent } from './pages/register/account-created-page/account-created-page.component';
import { AccountActivatedPageComponent } from './pages/register/account-activated-page/account-activated-page.component';
import { RecoverAccountPageComponent } from './pages/recover-account-page/recover-account-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { BannerPageComponent } from './pages/banner-page/banner-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';

const routes: Routes = [
    { path: '', component: MainLayoutComponent, canActivate: [ AuthGuard ],
        children: [
            { path: 'dashboard', component: HomePageComponent },
            { path: 'banner', component: BannerPageComponent },
            { path: 'bienvenida', component: WelcomePageComponent },
            { path: 'perfil-usuario', component: UserProfilePageComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    { path: 'login', component: LoginPageComponent },
    { path: 'registrarse', component: RegisterPageComponent },
    { path: 'cuenta-creada', component: AccountCreatedPageComponent },
    { path: 'activar-cuenta/:token', component: AccountActivatedPageComponent },
    { path: 'recuperar-cuenta', component: RecoverAccountPageComponent },
    { path: 'cambiar-credenciales/:token', component: ResetPasswordPageComponent },
    { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
