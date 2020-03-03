import { Component, OnInit } from '@angular/core';
import { CardsService } from 'src/app/mocks/cards.service';
import { ResumeCard } from 'src/app/models/resume-card';
import { Graph } from 'src/app/models/graph';
import { ResumeReportService } from 'src/app/mocks/resume-report.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  resumeCard: ResumeCard;
  title = 'Informe de facturación';
  graphCard: Graph;
  dropdownOptions: { text: string; key: string; }[];

  constructor(
    private cardsService: CardsService,
    private resumeReportService: ResumeReportService) { }


  ngOnInit() {
    this.resumeCard = this.cardsService.getResumeCard();
    this.dropdownOptions = this.cardsService.getDropdownConfiguration();
    this.graphCard = this.cardsService.getGraphCard(this.dropdownOptions[0].key);
  }

  changeContentGraph(option: string) {
    this.graphCard = this.cardsService.getGraphCard(option);
  }

  downloadResumeReport() {
    window.open(this.resumeReportService.getResumeReport('parametros'));
  }

}
