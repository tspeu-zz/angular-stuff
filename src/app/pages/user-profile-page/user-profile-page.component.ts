import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/models/country';
import { Affiliate } from 'src/app/models/affiliate';
import { map } from 'rxjs/operators';
import { MatStepper } from '@angular/material';


@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {

  affiliate = new BehaviorSubject<Affiliate>(null);
  countries: Country[] = [];

  constructor(private userService: UserService<Affiliate>,
    private countryService: CountryService) { }

  ngOnInit() {
    this.countryService.getCountries()
      .pipe(map(res => {
        this.countries = res.response;
        console.log('rcountrye', this.countries)
      })
      ).subscribe();
    // this.loadCountries();
    this.affiliate.next(this.userService.getUserValue());
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
