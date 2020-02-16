import {Component, Input, OnInit} from '@angular/core';
import {ExternalLayoutConfig} from '../../../models/config/external-layout-config';

@Component({
  selector: 'app-external-layout',
  templateUrl: './external-layout.component.html',
  styleUrls: ['./external-layout.component.scss']
})
export class ExternalLayoutComponent {

  @Input() config: ExternalLayoutConfig;

  constructor() {
  }

}
