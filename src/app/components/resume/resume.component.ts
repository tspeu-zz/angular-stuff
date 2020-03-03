import { Component, Input } from '@angular/core';
import { ResumeCard } from 'src/app/models/resume-card';
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {

  @Input() resumeCard: ResumeCard;

  constructor() { }

  changeDate(date) { }

}
