import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Link } from 'src/app/models/link';
import { Dropdown } from 'src/app/models/dropdown';
import { Icon } from 'src/app/models/icon';
import { LinksService } from 'src/app/mocks/links.service';
import { AuthService } from '../../../services/auth.service';
import { IconsService } from 'src/app/mocks/icons.service';
import {UserService} from '../../../services/user.service';
import { Affiliate } from 'src/app/models/affiliate';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavHeaderComponent implements OnInit {

  linksList: Link[];
  dropDown: Dropdown;
  element: Element;
  element1: Element;
  iconList: Icon[];
  user: Affiliate;
  open = false;
  public text: string;
  constructor(
    private linksService: LinksService,
    private authService: AuthService,
    private iconsService: IconsService,
    private userService: UserService<Affiliate>,
    private eRef: ElementRef) { }

  ngOnInit() {
    this.linksList = this.linksService.getLinks();
    this.iconList = this.iconsService.getIcons();
    this.user = this.userService.getUserValue();
  }


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
