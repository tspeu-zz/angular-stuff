import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Graph } from 'src/app/models/graph';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title: string;
  @Input() dropdownOptions: { text: string; key: string; }[];
  @Output() sendDropdownOption = new EventEmitter();

  constructor() { }

  selectOption(value) {
    this.sendDropdownOption.emit(value);
  }

}
