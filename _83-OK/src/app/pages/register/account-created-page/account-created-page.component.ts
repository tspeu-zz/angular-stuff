import { Component } from '@angular/core';
import {ExternalLayoutConfig} from '../../../models/config/external-layout-config';


@Component({
   selector: 'app-account-created',
   templateUrl: './account-created-page.component.html',
   styleUrls: ['./account-created-page.component.scss']
})
export class AccountCreatedPageComponent  {

   externalLayoutConfig: ExternalLayoutConfig = new ExternalLayoutConfig();
   titleCard = 'Confirmación de correo';

   constructor() {
      this.externalLayoutConfig.titlePosition = 'center';
   }
}
