import { Injectable } from '@angular/core';
import { Dropdown, Element } from 'src/app/models/dropdown';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {
  dropDown: Dropdown;
  element: Element;
  element1: Element;
  constructor() { }

  getDropDown(): Dropdown {
    this.element = {icon: '../../../../assets/img/blue-bell.svg', text: 'información'};
    this.element1 = {icon: '../../../../assets/img/blue-bell.svg', text: 'Desconectarse'};
    this.dropDown = {
      label: 'Angel Alvarez Garcia',
      color: 'white',
      icon: '../../../../assets/img/blue-bell.svg',
      imgUrl: '',
      elements: [this.element, this.element1]
    };
    return this.dropDown;
  }
}
