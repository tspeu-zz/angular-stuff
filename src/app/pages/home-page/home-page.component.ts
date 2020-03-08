import {Component, OnDestroy, OnInit} from '@angular/core';
import { CardsService } from 'src/app/mocks/cards.service';
import {DateRange, StatisticsAffiliate} from 'src/app/models/statistics-affiliate';
import { Graph } from 'src/app/models/graph';
import { ResumeReportService } from 'src/app/mocks/resume-report.service';
import {AffiliatesService} from '../../services/affiliates.service';
import {UserService} from '../../services/user.service';
import {Affiliate} from '../../models/affiliate';
import * as moment from 'moment';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  resumeCard: StatisticsAffiliate;
  title = 'Informe de facturación';
  graphCard: Graph = new Graph();
  dateRange: DateRange;

  userCountryCodeSubscription: Subscription;

  constructor(
    private cardsService: CardsService,
    private resumeReportService: ResumeReportService,
    private affiliateService: AffiliatesService,
    private userService: UserService<Affiliate>) {
    this.dateRange = {
      from: moment().startOf('month').format('YYYY-MM-DD'),
      to: moment().endOf('month').format('YYYY-MM-DD')
    };
  }

  private getStatistics() {
    this.userCountryCodeSubscription = this.userService.getUserCountryCodeAsObservable().subscribe(userCountryCode => {
      if (userCountryCode) {
        this.affiliateService.getStatistics(this.userService.getUserValue().code, userCountryCode, this.dateRange).subscribe(response => {
          if (response.success) {
            this.resumeCard = response.data;
            this.buildGraph(response.data.graph);
          }
        });
      }
    });
  }

  private buildGraph(graph: Graph) {
    this.graphCard = new Graph();
    this.graphCard.title = graph.title;
    this.graphCard.chartType = graph.chartType;
    this.graphCard.chartDataSets = graph.chartDataSets;
    this.graphCard.summary = graph.summary;
    this.graphCard.chartLabels = [];
    if (graph.chartLabels.length > 0) {
      graph.chartLabels.forEach(date => {
        this.graphCard.chartLabels.push(moment(date.split('/')[0]).format('MMMM'));
      });
    }
  }

  ngOnInit(): void {
    this.getStatistics();
  }

  ngOnDestroy(): void {
    if (this.userCountryCodeSubscription) { this.userCountryCodeSubscription.unsubscribe() }
  }

 /* changeContentGraph(option: string) {
    // this.graphCard = this.cardsService.getGraphCard(option);
  }

  downloadResumeReport() {
    window.open(this.resumeReportService.getResumeReport('parametros'));
  }*/

  onChangeDate(rangeDate: DateRange) {
    this.dateRange = rangeDate;
    this.getStatistics();
  }

}
