import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from './../models/Country';
import { ResponseCountry } from '../models/response/response-country';
import { Region } from '../models/Region';
import { map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private apiUrl = '';
    // private readonly geoApiUrl = 'https://api-geoapi-test.azurewebsites.net/api/';
    // private readonly geoApiUrl_TEST = 'https://api-geoapi-test.azurewebsites.net/api/countryconfig/ES?LanguageCode=es&LanguageVariant=es';
    private readonly geoAPI_URL = 'https://api-geoapi-test.azurewebsites.net/api/country?LanguageCode=es&LanguageVariant=es';
    // private readonly test = 'https://restcountries.eu/rest/v2/all';



    private countriesData: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>(undefined);
    // CountriesData: Country[] = [];
    regionsData: BehaviorSubject<Region[]> = new BehaviorSubject<Region[]>(undefined);
    prefixData: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    getCountries(): Observable<ResponseCountry<Country>> {

        console.log(this.geoAPI_URL);
        return this.http.get<ResponseCountry<Country>>(this.geoAPI_URL, this.httpOptions);
    }


    bindCountriesRegionsPrefix() {

        console.log(this.geoAPI_URL);
        return this.http.get<ResponseCountry<Country>>(this.geoAPI_URL, this.httpOptions)
            .pipe(map(c => {
                if (c.success) {
                    console.log('FROM bindCountriesRegionsPrefix --> ', c.response);
                    const countries = [...c.response];
                    console.log('-->countries--inside serv', countries);

                    //emit countries
                    this.setCountriesData(countries);

                } else {
                    console.log(c.errors);
                }

            })
            )
            .subscribe();
    }

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
    //





    // https://api-geoapi-test.azurewebsites.net/api/countryconfig/ES?LanguageCode=es&LanguageVariant=es

    // https://api-geoapi-test.azurewebsites.net/api/countryconfig/
    // ES?
    // LanguageCode=es
    // &LanguageVariant=es


    private paises = [
        {
            name: 'string',
            id: null,
            phone: 'string'
        }];
    //https://api-geoapi-test.azurewebsites.net/api/country?LanguageCode=es&LanguageVariant=es

    // getCountry(): Observable<ResponseBody<Country>> {

    //     console.log(this.geoApiUrl_TEST);
    //     return this.http.get<ResponseBody<Country>>(this.geoApiUrl_TEST, this.httpOptions);
    // }


    // getCountryAll(): Observable<ResponseCountry<Country>> {

    //     return this.http.get<ResponseCountry<Country>>(this.geoApiUrl_TEST, this.httpOptions);
    // }
    // getPaisesAll(): Observable<ResponseCountry<Country>> {

    //     return this.http.get<ResponseCountry<Country>>('https://restcountries.eu/rest/v2/all', this.httpOptions);
    // }

    // getLocalJson() {

    //     return this.http.get('assets/countries.json');
    // }

    // getAllPaises() {
    //     return this.paises = [
    //         {
    //             "name": "España",
    //             "id": 68,
    //             "phone": "34"
    //         },
    //         {
    //             "name": "Mexico",
    //             "id": 69,
    //             "phone": "55"
    //         },
    //         {
    //             "name": "Argentina",
    //             "id": 70,
    //             "phone": "54"
    //         },
    //         {
    //             "name": "Perú",
    //             "id": 71,
    //             "phone": "56"
    //         }
    //     ];
    // }


}


