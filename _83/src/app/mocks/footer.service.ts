import { Injectable } from '@angular/core';
import { Footer } from '../models/footer';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  footerConfiguration: Footer;

  constructor() { }

  getFooter(): Footer {
    this.footerConfiguration = {
      icon: '../../../../assets/alarm_icon-icons.com_48364.svg',
      copyright: 'Copyright ©',
      year: new Date().getFullYear(),
      business: 'TECH Education ',
      country: 'España',
      right: '- Todos los derechos reservados'
    };
    return this.footerConfiguration;
  }
}
