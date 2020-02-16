import { Component, Input } from '@angular/core';
import { Icon } from 'src/app/models/icon';

@Component({
  selector: 'app-icons-menu',
  templateUrl: './icons-menu.component.html',
  styleUrls: ['./icons-menu.component.scss']
})

export class IconsMenuComponent {

  @Input() iconList: Icon[];
  open: boolean;

  constructor() { }

  controlNav() {
    this.open = !this.open;
  }

}
