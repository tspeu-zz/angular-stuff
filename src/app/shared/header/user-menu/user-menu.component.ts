import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { Affiliate } from 'src/app/models/affiliate';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent   {
  open: boolean;
  @Input() user: Affiliate;
  constructor(private eRef: ElementRef,
              private authService: AuthService) { }

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

  logout(): void {
    this.authService.logout();
  }

}
