import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CountryService } from 'src/app/services/country.service';
import { GeoCountry } from 'src/app/models/geo-country';
import { Affiliate } from 'src/app/models/affiliate';
import { MatStepper } from '@angular/material';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {

  countries: GeoCountry[] = [];
  affiliate: Affiliate;
  reload = false;
  // @ViewChild('loading', { static: false }) loading: LoadingComponent;

  constructor(private userService: UserService<Affiliate>,
    private countryService: CountryService) { }

  ngOnInit() {
    this.affiliate = this.userService.getUserValue();
    // this.reload = this.affiliate ? true : false;
    this.countries = this.countryService.getCountriesValue();
    if (!this.affiliate) {
      this.userService.getUserData()
        .subscribe(res => {
          this.affiliate = res;
          //this.reload = false;
        });
    }

    if (this.countries.length === 0) {

      // setTimeout(() => {
      //   this.countries = this.countryService.getGeoCountries();
      //   this.reload = true;

      // }, 5000);

      this.countryService.getCountries().subscribe(res => {
        this.countries = res.response;
        this.reload = true;

      });
    }
  }

  goForwardStepper(stepper: MatStepper) {
    stepper.next();
  }

}
