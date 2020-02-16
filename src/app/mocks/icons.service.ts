import { Injectable } from '@angular/core';
import { Icon } from '../models/icon';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  iconList: Icon[];
  icon: Icon;
  icon1: Icon;
  icon2: Icon;
  icon3: Icon;
  constructor() { }

  getIcons(): Icon[] {
    this.icon = {label: 'Prueba', notificationNumber: 1, icon:  '../../../../assets/img/blue-bell.svg'};
    this.iconList = [this.icon];
    return this.iconList;
  }
}
