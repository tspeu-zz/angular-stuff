import { Component, Input } from '@angular/core';
import { Graph } from 'src/app/models/graph';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
   @Input() graphCard: Graph;

   constructor() { }

   chartClicked(): void { }
   chartHovered(): void { }
}
