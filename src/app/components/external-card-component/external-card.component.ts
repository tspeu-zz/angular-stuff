import { Component, Input } from '@angular/core';
import { Constants } from 'src/app/globals/constants';

@Component({
  selector: 'app-external-card',
  templateUrl: './external-card.component.html',
  styleUrls: ['./external-card.component.scss']
})
export class ExternalCardComponent {

  @Input() title: string;
  @Input() logo: string;

  public readonly logoImage: string;

  constructor( ) {
    this.logoImage =  Constants.WHITE_LOGO_TECH;
  }

}
