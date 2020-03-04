import { Injectable } from '@angular/core';
import { Footer } from '../models/footer';
import {LocalizationService} from '../services/localization.service';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor() { }

  getFooter(): Footer {
    return {
      icon: '../../../../assets/alarm_icon-icons.com_48364.svg',
      copyright: 'Copyright ©',
      year: new Date().getFullYear(),
      business: 'TECH Education ',
      country: '',
      right: '- Todos los derechos reservados'
    };
  }
}
