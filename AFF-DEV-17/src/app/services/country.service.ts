import { ResponseCountry } from './../models/response/response-country';
import { Country } from './../models/Country';
import { ResponseBody } from './../models/response/response-body';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Region } from '../models/Region';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private readonly apiUrl = 'https://api-geoapi-test.azurewebsites.net/api/country?LanguageCode=es&LanguageVariant=es';
    // private countryCode: BehaviorSubject<string>;

    private countriesData: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>(undefined);
    private regionsData: BehaviorSubject<Region[]> = new BehaviorSubject<Region[]>(undefined);
    private prefixData: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {}

    getCountries(): Observable<ResponseCountry<Country>> {

        console.log(this.apiUrl);
        return this.http.get<ResponseCountry<Country>>(this.apiUrl, this.httpOptions);
    }

    bindCountriesRegionsPrefix() {

        console.log(this.apiUrl);
        return this.http.get<ResponseCountry<Country>>(this.apiUrl, this.httpOptions)
            .pipe(map(c => {
                if (c.success) {
                    console.log('FROM bindCountriesRegionsPrefix --> ', c.response);
                    const countries = [...c.response];
                    console.log('-->countries--inside serv', countries);
                    // emit countries
                    this.setCountriesData(countries);
                } else {
                    console.log(c.errors);
                }
            })
            );
    }

    //TODO:
    setCountriesData(country: Country[]) {
        this.countriesData.next(country);
    }
    getCountriesDataValue(): Country[] {
        return this.countriesData.getValue();
    }
    getCountriesData(): Observable<Country[]> {
        return this.countriesData;
    }

    setRegionsData(region: Region[]) {
        this.regionsData.next(region);
    }
    getRegionsDataValue(): Region[] {
        return this.regionsData.getValue();
    }
    getregionsData(): Observable<Region[]> {
        return this.regionsData;
    }
    //
    setPrefixData(prefix: string) {
        this.prefixData.next(prefix);
    }
    getPrefixDataValue(): string {
        return this.prefixData.getValue();
    }
    getPrefixData(): Observable<string> {
        return this.prefixData;
    }


}


