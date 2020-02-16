import { Component } from '@angular/core';
import { Link } from '../../../models/link';
import { Input } from '@angular/core';

@Component({
  selector: 'app-links-menu',
  templateUrl: './links-menu.component.html',
  styleUrls: ['./links-menu.component.scss']
})
export class LinksMenuComponent {

  @Input() linksList: Link[];

  constructor() { }

}
