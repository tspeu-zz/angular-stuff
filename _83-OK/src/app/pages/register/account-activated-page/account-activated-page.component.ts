import { Component } from '@angular/core';
import {ExternalLayoutConfig} from '../../../models/config/external-layout-config';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {environment} from '../../../../environments/environment';
import {CardContent} from '../../../models/card-content';

@Component({
  selector: 'app-account-activated-page',
  templateUrl: './account-activated-page.component.html',
  styleUrls: ['./account-activated-page.component.scss']
})
export class AccountActivatedPageComponent {

   externalLayoutConfig: ExternalLayoutConfig = new ExternalLayoutConfig();
   titleCard = 'Activar cuenta';
   isLoading = true;
   cdnUrl = environment.cdnUrl + 'assets/img/';
   token: string;
   cardContent: CardContent = new CardContent();

   constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {
      this.externalLayoutConfig.titlePosition = 'center';
      this.externalLayoutConfig.isActiveLogoFooter = true;

      this.activatedRoute.params.subscribe(params => {
         this.token = params.token;
         this.confirmEmail();
      });
   }

   retryConfirmEmail() {
      this.isLoading = true;
      setTimeout( () => {
         this.confirmEmail();
      }, 2000);
   }

   private confirmEmail() {
      this.authService.confirmEmail(this.token).subscribe(response => {
         this.setCardContent(response.success);
         this.isLoading = false;
      }, error => {
         this.setCardContent(false);
         this.isLoading = false;
      });
   }

   private setCardContent(isSuccessResponse: boolean) {
      if (isSuccessResponse) {
         this.cardContent = {
            isErrorCard: false,
            image: this.cdnUrl + 'notification-confirm.png',
            buttonLabel: 'Ir a iniciar sesión',
            mainMessage: 'Se ha activado correctamente la cuenta',
         };
      } else {
         this.cardContent = {
            isErrorCard: true,
            image: this.cdnUrl + 'notification-error.png',
            buttonLabel: 'Reintentar',
            mainMessage: 'Ha ocurrido un error al activar la cuenta',
            descriptionMessage: 'Reinténtelo de nuevo para activarla'
         };
      }
   }

}
