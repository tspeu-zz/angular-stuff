import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CountryService } from 'src/app/services/country.service';
import { GeoCountry } from 'src/app/models/geo-country';
import { Affiliate } from 'src/app/models/affiliate';
import { MatStepper } from '@angular/material';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {

  countries: GeoCountry[] = [];
  affiliate: Affiliate;
  reload = false;

  constructor(private userService: UserService<Affiliate>,
    private countryService: CountryService) { }

  ngOnInit() {
    console.log('user');
    this.affiliate = this.userService.getUserValue();
    this.reload = this.affiliate ? true : false;
    this.countries = this.countryService.getGeoCountries();


    if (!this.affiliate) {
      this.userService.getUserData()
        .subscribe(res => {
          console.log(res);
          this.affiliate = res;
          this.reload = true;
        });
    }
    // this.countryService.setCountryObservable();


    if (this.countries.length <= 0)
      this.countryService.getCountries().subscribe(res => {
        console.log('page ', res);
        this.countries = res.response;
      });
    // this.countryService.getCountriesValue()
    //   .subscribe(
    //     res => {
    //       console.log('-->,', res);
    //       this.countries = res;
    //     }
    //   );


  }

  goForwardStepper(stepper: MatStepper) {
    stepper.next();
  }

}
