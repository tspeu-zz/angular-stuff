import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/models/link';
import { DropDown } from 'src/app/models/Dropdown';
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
  dropDown: DropDown;
  element: Element;
  element1: Element;
  iconList: Icon[];
  user: Affiliate;

  constructor(
    private linksService: LinksService,
    private authService: AuthService,
    private iconsService: IconsService,
    private userService: UserService<Affiliate>) { }

  ngOnInit() {
    this.linksList = this.linksService.getLinks();
    this.iconList = this.iconsService.getIcons();
    this.user = this.userService.getUserValue()
  }

  logout(): void {
    this.authService.logout();
 }

}
