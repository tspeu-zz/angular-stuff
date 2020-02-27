import { Component, Input } from '@angular/core';
import { Footer } from 'src/app/models/footer';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Input() footerConfiguration: Footer;

  constructor() { }

  footerText(): string {
    const footerText: string = this.footerConfiguration.country + ' | ';
    return footerText + [
      '<strong>' + this.footerConfiguration.copyright,
      this.footerConfiguration.year ,
      this.footerConfiguration.business + '</strong>',
      this.footerConfiguration.right
    ].join(' ');
  }

}
