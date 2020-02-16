import { Component, OnInit } from '@angular/core';
import { Footer } from 'src/app/models/footer';
import { FooterService } from 'src/app/mocks/footer.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {

  footerConfiguration: Footer;

  constructor(private footerService: FooterService) { }

  ngOnInit() {
    this.footerConfiguration = this.footerService.getFooter();
  }
}
