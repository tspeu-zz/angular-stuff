import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseBody} from '../models/response/response-body';
import {SearchResponse} from '../models/response/search-response';
import {Paginated} from '../models/paginated';
import {Course} from '../models/course';
import {Constants} from '../globals/constants';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

   private readonly courseApiPath = environment.courseApi;

   constructor(private http: HttpClient) { }

   searchCourses(areaUrl: string, categoryUrl: string, specialityUrl: string, terms: string, paginated: Paginated)
         : Observable<ResponseBody<SearchResponse<Course>>> {
      const params = this.buildParams(areaUrl, categoryUrl, specialityUrl, terms, paginated);
      return this.http.get<ResponseBody<SearchResponse<Course>>>(this.courseApiPath + 'courses/NewSearch', { params } );
   }

   private buildParams(areaUrl: string, categoryUrl: string, specialityUrl: string, terms: string, paginated: Paginated) {
      let params = new HttpParams().set('countryCode', Constants.DEFAULT_COUNTRY_CODE)
            .set('searchFilters', 'true')
            .set('page', '' + (paginated.page - 1))
            .set('pageSize', '' + paginated.pageSize);
      if (areaUrl) {
         params = params.set('areas', areaUrl);
      }
      if (categoryUrl) {
         params = params.set('categories', categoryUrl);
      }
      if (specialityUrl) {
         params = params.set('specialities', specialityUrl);
      }
      if (terms !== '') {
         params = params.set('terms', terms);
      }
      return params;
   }
}
