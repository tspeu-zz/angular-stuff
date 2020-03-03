import { Component, OnInit } from '@angular/core';
import { Footer } from 'src/app/models/footer';
import { FooterService } from 'src/app/mocks/footer.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  footerConfiguration: Footer;

  constructor(private footerService: FooterService) { }

  ngOnInit() {
    this.footerConfiguration = this.footerService.getFooter();
  }
}
