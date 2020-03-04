import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ResponseGeoApi } from '../models/response/response-geo-api';
import { GeoCountry } from '../models/geo-country';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private readonly geoApiUrl = environment.geoApiUrl + 'country';
    private countriesData = new BehaviorSubject<GeoCountry[]>([]);
    private countriesStore: { countries: GeoCountry[] } = { countries: [] };
    private geoCountries: GeoCountry[];

    constructor(private http: HttpClient) {}

    getCountries(): Observable<ResponseGeoApi<GeoCountry[]>> {
      const params = new HttpParams()
          .set('LanguageCode', 'ES')
          .set('LanguageVariant', 'ES');
      return this.http.get<ResponseGeoApi<GeoCountry[]>>(this.geoApiUrl, { params });
    }

    get countries() {
        this.loadAllCountries();
        return this.countriesData.asObservable();
    }

    loadAllCountries() {
        this.getCountries()
        .subscribe(
            res => {
                this.countriesStore.countries = res.response;
                this.countriesData.next(Object.assign({}, this.countriesStore).countries);
                },
                error => {
                    console.log('Error load Countries, ', error);
                }
            );
    }

    getGeoCountries(): GeoCountry[] {
      return this.geoCountries;
    }

    setGeoCountries(countries: GeoCountry[]) {
      this.geoCountries = countries;
    }

}
