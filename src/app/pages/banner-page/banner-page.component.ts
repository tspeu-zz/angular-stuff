import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { UtilsService } from '../../services/utils.service';
import { Item } from '../../models/item';
import { Paginated, PaginationControlsConfig } from '../../models/paginated';
import { Filter, SearchFilters } from '../../models/response/search-response';
import { Course } from '../../models/course';
import {Affiliate} from '../../models/affiliate';
import {UserService} from '../../services/user.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner-page.component.html',
  styleUrls: ['./banner-page.component.scss']
})
export class BannerPageComponent {

  private readonly HOST_TECH = environment.hostTech;

  courses: Course[] = [];
  areaSelected: Item;
  specialitySelected: Item;
  categorySelected: Item;
  paginated: Paginated = new Paginated();
  isLoading = true;
  filtersGroups: Filter[];
  searchTerms = '';
  paginationControlConfig: PaginationControlsConfig = new PaginationControlsConfig();
  totalItems: number;
  copiedUrlCourse = -1;

  constructor(private searchService: SearchService, private utilsService: UtilsService, private userService: UserService<Affiliate>) {
    this.search();
  }

  search() {
    this.paginated = new Paginated();
    this.searchCourses();
  }

  parseFilters(filters: SearchFilters): void {
    this.filtersGroups = [];
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        const items = this.setupFilters(filters, key);
        this.filtersGroups.push({
          label: filters[key].label,
          items,
          key
        });
      }
    });
  }

  private setupFilters(filters: SearchFilters, key: string) {
    const items: Item[] = [];
    filters[key].items.forEach(item => {
      if (item.total > 0) {
        items.push(item);
      }
      if (item.selected) {
        this.setFilterSelected(item, key);
      }
    });
    return items;
  }

  getFilterSelected(kind: string): Item {
    switch (kind) {
      case 'areas': return this.areaSelected;
      case 'categories': return this.categorySelected;
      case 'specialities': return this.specialitySelected;
    }
  }

  setFilterSelected(filter: Item, kind: string) {
    switch (kind) {
      case 'areas': this.areaSelected = filter; break;
      case 'categories': this.categorySelected = filter; break;
      case 'specialities': this.specialitySelected = filter; break;
    }
  }

  copyToClickBoard(url: string, indexCourse: number) {
    this.copiedUrlCourse = indexCourse;
    this.utilsService.copyTextToClickBoard(`${this.HOST_TECH}${url}?efcode=${this.userService.getUserValue().code}` );
  }

  onPageChange(page: number): void {
    this.paginated.page = page;
    this.searchCourses();
  }

  onFilterChange(item: Item, kind: string) {
    this.setFilterSelected(item, kind);
    this.searchCourses();
  }

  private getSeoUrl(item: Item): string {
    return item ? item.seoUrl : undefined;
  }

  private searchCourses() {
    this.isLoading = true;
    this.searchService.searchCourses(this.getSeoUrl(this.areaSelected),
        this.getSeoUrl(this.categorySelected),
        this.getSeoUrl(this.specialitySelected),
        this.searchTerms,
        this.paginated)
    .subscribe(response => {
      if (response.success) {
        const data = response.data;
        if (data.searchFilters) {
          this.parseFilters(data.searchFilters);
        }
        if (data.paginatedResult) {
          this.totalItems = data.paginatedResult.total;
          this.courses = data.paginatedResult.items;
        }
        this.isLoading = false;
      }
    }, error => this.isLoading = false);
  }
}
