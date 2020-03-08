import { Component, OnInit } from '@angular/core';
import { Footer } from 'src/app/models/footer';
import { FooterService } from 'src/app/mocks/footer.service';
import {LocalizationService} from '../../../services/localization.service';
import {CountryService} from '../../../services/country.service';
import {version} from '../../../../assets/version';
import {UserService} from '../../../services/user.service';
import {Affiliate} from '../../../models/affiliate';

@Component({
  selector: 'app-base-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  appVersion: string = version;

  constructor(private footerService: FooterService, private localization: LocalizationService, private countryService: CountryService,
              private userService: UserService<Affiliate>) { }

  ngOnInit() {
    this.localization.getClientInfo().subscribe(response => {
      this.userService.setUserCountryCode(response.data.userCountryCode);
    });
    this.getCountries();
  }

  private getCountries() {
    this.countryService.getCountries().subscribe(res => {
      this.countryService.setGeoCountries(res.response);
      this.countryService.setCountries(res.response);
    });
  }

  get footerConfiguration(): Footer {
    const footerConfig = this.footerService.getFooter();
    if (this.userService.getUserCountryCodeValue() && this.countryService.getGeoCountries()) {
      const geoCountry = this.countryService.getGeoCountries()
          .find(country => country.isoCode === this.userService.getUserCountryCodeValue());
      footerConfig.country = geoCountry.name;
    }
    return footerConfig;
  }
}
