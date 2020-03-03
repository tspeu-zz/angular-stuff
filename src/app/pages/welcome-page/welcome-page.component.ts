import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { CountryService } from 'src/app/services/country.service';
import { Affiliate } from 'src/app/models/affiliate';
import { Country } from 'src/app/models/country';
import { SharePersonalData } from 'src/app/models/share-personal-data';
import { BehaviorSubject } from 'rxjs';
import { MatStepper } from '@angular/material';



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
  isActiveStepper = false;
  isLinear = true;


  constructor(private userService: UserService<Affiliate>,
              private countryService: CountryService) { }

  ngOnInit() {
    this.loadCountries();
    this.affiliate.next(this.userService.getUserValue());
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

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  activateStepper(isActivate: boolean) {
    this.isActiveStepper = isActivate;
  }

}
