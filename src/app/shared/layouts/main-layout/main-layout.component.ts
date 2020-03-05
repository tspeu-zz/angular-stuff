import { Component, OnInit } from '@angular/core';
import { Footer } from 'src/app/models/footer';
import { FooterService } from 'src/app/mocks/footer.service';
import { LocalizationService } from '../../../services/localization.service';
import { CountryService } from '../../../services/country.service';
import { version } from '../../../../assets/version';

@Component({
  selector: 'app-base-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  appVersion: string = version;

  constructor(private footerService: FooterService, private localization: LocalizationService, private countryService: CountryService) { }

  ngOnInit() {
    this.localization.getClientInfo().subscribe(response => {
      this.localization.setUserCountryCode(response.data.userCountryCode);
    });
    this.getCountries();
  }

  private getCountries() {
    this.countryService.getCountries().subscribe(res => {
      console.log('getCountries', res);
      this.countryService.setGeoCountries(res.response);
    });
  }

  get footerConfiguration(): Footer {
    const footerConfig = this.footerService.getFooter();
    console.log('footerConfig', footerConfig);
    // if (this.localization.getUserCountryCode() && this.countryService.getGeoCountries()) {
    //   const geoCountry = this.countryService.getGeoCountries().find(country => country.isoCode === this.localization.getUserCountryCode());
    //   footerConfig.country = geoCountry.name;
    // }
    footerConfig.country = 'AR';
    return footerConfig;
  }
}
