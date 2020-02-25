import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Affiliate } from 'src/app/models/affiliate';
// import { PersonalData } from 'src/app/models/personal-data';
import { AffiliatesService } from 'src/app/services/affiliates.service';
// import { InvoiceData } from 'src/app/models/invoice-data';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/models/country';
// import { Region } from 'src/app/models/region';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatStepperModule } from '@angular/material/stepper';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {


  affiliate: Affiliate;
  countriesData: Observable<Country[]>;
  countries: Country[] = [];
  checkPersonalData: boolean;

  isLinear = false;

  constructor(private userService: UserService<Affiliate>,
    private affiliatesService: AffiliatesService,
    private countryService: CountryService) { }


  ngOnInit() {
    this.affiliate = this.userService.getUserValue();

    // this.countryService.getCountries()
    //   .subscribe(res => {
    //     if (res.success) {
    //       this.countries = [...res.response];
    //     }
    //   });
    this.loadCountries();

  }

  loadCountries() {
    this.countryService.loadAllCountries();
    this.countriesData = this.countryService.countries;
    this.countriesData
      .pipe(
        map(res => {
          this.countries = res;
          console.log('countries papa ->', this.countries);
        })
      ).subscribe();

  }

  onSharePersonalData(event: boolean) {
    console.log('PADRE ', event);
    this.checkPersonalData = event;
    console.log(this.checkPersonalData);
  }

}
