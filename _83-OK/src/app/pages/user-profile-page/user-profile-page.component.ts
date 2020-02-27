import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/models/country';
import { Affiliate } from 'src/app/models/affiliate';
import { map } from 'rxjs/operators';
import { AffiliateDataService } from 'src/app/mocks/affiliate-data.service';


@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {

  affiliate = new BehaviorSubject<Affiliate>(null);
  affiliateData: Affiliate;
  countries: Country[] = [];

  constructor(private userService: UserService<Affiliate>,
    private countryService: CountryService,
    private affiliateDataService: AffiliateDataService) { }

  ngOnInit() {
    this.loadCountries();
    // solo para test //
    const userAffiliate = this.userService.getUserValue();
    this.affiliateDataService.mockAffiliateData(userAffiliate);
    this.affiliate.next(userAffiliate);
    this.affiliateData = userAffiliate;
    console.log('test', this.affiliateData);
    // solo para test //
    // this.affiliate.next(this.userService.getUserValue());

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
