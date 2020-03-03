import { Component, Input, HostListener, ElementRef } from '@angular/core';
import { Icon } from 'src/app/models/icon';

@Component({
  selector: 'app-icons-menu',
  templateUrl: './icons-menu.component.html',
  styleUrls: ['./icons-menu.component.scss']
})

export class IconsMenuComponent {

  @Input() iconList: Icon[];
  open: boolean;
  text: string;

  constructor(private eRef: ElementRef) { }

  controlNav() {
    this.open = !this.open;
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
