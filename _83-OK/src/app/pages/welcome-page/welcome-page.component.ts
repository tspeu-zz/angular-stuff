import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { CountryService } from 'src/app/services/country.service';
import { Affiliate } from 'src/app/models/affiliate';
import { Country } from 'src/app/models/country';
import { SharePersonalData } from 'src/app/models/share-personal-data';
import { BehaviorSubject } from 'rxjs';
import { AffiliateDataService } from 'src/app/mocks/affiliate-data.service';
// import {ModalDirective} from 'angular-bootstrap-md';




@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {


  affiliate =  new BehaviorSubject<Affiliate>(null);
  countries: Country[] = [];
  showCheckPersonalData = true;
  showPrivacyPolicy = true;
  sendPersonalData: SharePersonalData;

  constructor(private userService: UserService<Affiliate>,
              private countryService: CountryService,
              private affiliateDataService: AffiliateDataService) { }

  ngOnInit() {
    this.loadCountries();
    // solo para test //
    const mockDataAffiliate = this.userService.getUserValue();
    this.affiliateDataService.mockAffiliateData(mockDataAffiliate);
    this.affiliate.next(mockDataAffiliate);
    // solo para test //
    // this.affiliate.next(this.userService.getUserValue());
  }


  getPersonalData(personalData: SharePersonalData) {
    this.sendPersonalData = personalData;
  }


  loadCountries() {
    return this.countryService.countries
      .pipe(
        map(res => {
          this.countries = res;
        })
      ).subscribe();
  }

}
