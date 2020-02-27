import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ResponseCountry } from './../models/response/response-country';
import { Country } from '../models/country';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private readonly geoApiUrl = environment.geoApiUrl + 'country';
    private countriesData = new BehaviorSubject<Country[]>([]);
    private countrieStore: { countries: Country[] } = { countries: [] };

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {}

    getCountries(): Observable<ResponseCountry<Country>> {

        return this.http.get<ResponseCountry<Country>>(this.geoApiUrl + '?LanguageCode=es&LanguageVariant=es', this.httpOptions);
    }

    get countries() {
        // if (this.countrieStore.countries !== null) {
        // }
        this.loadAllCountries();
        return this.countriesData.asObservable();
    }

    loadAllCountries() {
        this.getCountries()
            .subscribe(
                res => {
                    this.countrieStore.countries = res.response;
                    this.countriesData.next(Object.assign({}, this.countrieStore).countries);
                },
                error => {
                    console.log('Error load Countries, ', error);
                }
            );
    }
}
