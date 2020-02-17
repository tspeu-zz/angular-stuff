import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Affiliate } from '../../models/affiliate';
import { CardsService } from 'src/app/mocks/cards.service';
import { ResumeCard } from 'src/app/models/resumeCard';
import { Graph } from 'src/app/models/graph';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  resumeCard: ResumeCard;
  title = 'Informe de facturación';
  graphCard: Graph;

  constructor(private cardsService: CardsService) { }


  ngOnInit() {
    this.resumeCard = this.cardsService.getResumeCard();
    this.graphCard = this.cardsService.getGraphCard();
  }

}
