import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { CountryService } from 'src/app/services/country.service';
import { GeoCountry } from 'src/app/models/geo-country';
import { Affiliate } from 'src/app/models/affiliate';
import { map } from 'rxjs/operators';
import { MatStepper } from '@angular/material';
import { AffiliatesService } from 'src/app/services/affiliates.service';


@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {

  countries: GeoCountry[] = [];
  affiliate: Affiliate;

  constructor(private userService: UserService<Affiliate>,
    private countryService: CountryService,
    private affiliatesService: AffiliatesService) { }

  ngOnInit() {
    console.log('user profile');
    // const affiliateLogin = this.userService.getUserValue();
    // console.log(affiliateLogin);
    this.affiliate = this.userService.getUserValue();
    this.countries = this.countryService.getGeoCountries();

    // this.countryService.getCountries()
    // .pipe(map(res => {
    //   this.countries = res.response;
    //   console.log('countries', this.countries);
    // })
    // ).subscribe();

  }



  loadCountries() {
    return this.countryService.countries
      .pipe(
        map(res => {
          this.countries = res;
        })
      ).subscribe();
  }

  goForwardStepper(stepper: MatStepper) {
    stepper.next();
  }

}
