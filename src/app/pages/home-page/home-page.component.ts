import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Affiliate} from '../../models/affiliate';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private userService: UserService<Affiliate>) { }

  ngOnInit() {
     console.log('home', this.userService.getUserValue()); // TODO quitar solo son pruebas
  }

}
