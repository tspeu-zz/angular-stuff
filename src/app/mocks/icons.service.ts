import { Injectable } from '@angular/core';
import { Icon } from '../models/icon';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  icons: Icon[];
  constructor() { }

  getIcons(): Icon[] {
    this.icons = [
    {label: 'Prueba', notificationNumber: 1, icon:  '../../../../assets/img/blue-bell.svg'},
    {label: 'Prueba', notificationNumber: 0, icon:  '../../../../assets/img/blue-bell.svg'},
    {label: 'Prueba', notificationNumber: 3, icon:  '../../../../assets/img/blue-bell.svg'}];
    return this.icons;
  }
}
