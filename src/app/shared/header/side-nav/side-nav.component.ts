import { Component, Input, HostListener, ElementRef } from '@angular/core';
import { Link } from 'src/app/models/link';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  @Input() linksList: Link[];
  open = false;
  text: string;

  constructor(private eRef: ElementRef) {}

  controlNav() {
    this.open = !this.open;
  }

  closeSideNav() {
    this.open = false;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(e) {
      this.open = false;
  }

    @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }
}
