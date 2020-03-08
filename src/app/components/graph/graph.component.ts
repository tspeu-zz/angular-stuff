import { Component, Input } from '@angular/core';
import { Graph } from 'src/app/models/graph';
import {DateRange} from '../../models/statistics-affiliate';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
   @Input() graphCard: Graph;
   @Input() countryCode: string;
   @Input() currencySymbol: string;
   @Input() dateRange: DateRange;

   constructor() { }

   chartClicked(): void { }
   chartHovered(): void { }
}
