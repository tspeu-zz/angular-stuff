import {Component, Input, OnInit} from '@angular/core';
import {ExternalLayoutConfig} from '../../../models/config/external-layout-config';

@Component({
  selector: 'app-external-layout',
  templateUrl: './full-page-layout.component.html',
  styleUrls: ['./full-page-layout.component.scss']
})
export class FullPageLayoutComponent {

  @Input() config: ExternalLayoutConfig;

  constructor() {
  }

}
