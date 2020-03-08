import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateRange, SatDatePicker, StatisticsAffiliate} from 'src/app/models/statistics-affiliate';

import * as moment from 'moment';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  @Input() resumeCard: StatisticsAffiliate;
  @Input() dateRange: DateRange;
  @Output() onChangeDate = new EventEmitter<DateRange>();

  satDatePicker: SatDatePicker;
  constructor() {}

  ngOnInit(): void {
    this.satDatePicker = { begin: new Date(this.dateRange.from), end: new Date(this.dateRange.to) };
  }


  changeDate(rangeDate) {
    this.satDatePicker = rangeDate.value;
    this.onChangeDate.emit({
      from: moment(rangeDate.value.begin).format('YYYY-MM-DD'),
      to: moment(rangeDate.value.end).format('YYYY-MM-DD')
    });
  }


}
