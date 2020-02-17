import { Component, Input } from '@angular/core';
import { Graph } from 'src/app/models/graph';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title: string;
  @Input() graphCard: Graph;

  constructor() { }
}
