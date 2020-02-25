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
    private _countries = new BehaviorSubject<Country[]>([]);
    private dataStore: { countries: Country[] } = { countries: [] };
    public countries = this._countries.asObservable();


    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    getCountries(): Observable<ResponseCountry<Country>> {

        return this.http.get<ResponseCountry<Country>>(this.geoApiUrl + '?LanguageCode=es&LanguageVariant=es', this.httpOptions);
    }

    get Countries() {
        return this._countries.asObservable();
    }

    loadAllCountries() {
        this.getCountries()
            .subscribe(
                res => {
                    this.dataStore.countries = res.response;
                    this._countries.next(Object.assign({}, this.dataStore).countries);
                    console.log('SERVICE this.dataStore.countries', this.dataStore.countries);
                },
                error => {
                    console.log('Error load Countries, ', error);
                }
            );
    }


}
