import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { CountryService } from 'src/app/services/country.service';
import { Affiliate } from 'src/app/models/affiliate';
import { GeoCountry } from 'src/app/models/geo-country';
import { SharePersonalData } from 'src/app/models/share-personal-data';
import { BehaviorSubject } from 'rxjs';
import { MatStepper } from '@angular/material';



@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {


  affiliate: Affiliate;
  countries: GeoCountry[] = [];
  showCheckPersonalData = true;
  showPrivacyPolicy = true;
  sendPersonalData: SharePersonalData;
  isActiveStepper = false;
  isLinear = true;


  constructor(private userService: UserService<Affiliate>,
    private countryService: CountryService) { }

  ngOnInit() {
    this.affiliate = this.userService.getUserValue();
    this.countries = this.countryService.getGeoCountries();

    //   this.countryService.getCountries()
    //     .pipe(map(res => {
    //       this.countries = res.response;
    //       console.log('countries', this.countries);
    //     })
    //     ).subscribe();
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

  goForwardStepper(stepper: MatStepper) {
    stepper.next();
  }

  activatedStepper(isActivate: boolean) {
    this.isActiveStepper = isActivate;
  }

}
