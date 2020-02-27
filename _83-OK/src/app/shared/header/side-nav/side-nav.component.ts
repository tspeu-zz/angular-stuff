import { Component, Input, HostListener } from '@angular/core';
import { Link } from 'src/app/models/link';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  @Input() linksList: Link[];
  open = false;

  constructor() {}

  controlNav() {
    this.open = !this.open;
  }

  closeSideNav() {
    this.open = false;
  }

  @HostListener('window:scroll', ['$event'])
    onScroll(e) {
        this.closeSideNav();
    }

}
