import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { ResponseGeoApi } from '../models/response/response-geo-api';
import { GeoCountry } from '../models/geo-country';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly geoApiUrl = environment.geoApiUrl + 'country';
  private geoCountries: GeoCountry[];
  private _countries = new BehaviorSubject<GeoCountry[]>([]);

  constructor(private http: HttpClient) { }

  getCountries(): Observable<ResponseGeoApi<GeoCountry[]>> {
    const params = new HttpParams()
      .set('LanguageCode', 'ES')
      .set('LanguageVariant', 'ES');
    return this.http.get<ResponseGeoApi<GeoCountry[]>>(this.geoApiUrl, { params });
  }

  getGeoCountries(): GeoCountry[] {
    return this.geoCountries;
  }

  setGeoCountries(countries: GeoCountry[]) {
    this.geoCountries = countries;
  }

  setCountryObservable() {
    console.log(this.geoCountries);
    return this._countries.next(this.geoCountries);
  }

  geCountriesValue(): Observable<GeoCountry[]> {
    return this._countries;
  }


}
