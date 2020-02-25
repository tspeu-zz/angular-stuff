import { Item } from '../item';
import {PaginatedResult} from '../paginated';

export class SearchResponse<T> {
  paginatedResult: PaginatedResult<T>;
  searchFilters: SearchFilters;
}

export class SearchFilters {
  areas: Filter;
  categories: Filter;
  specialities: Filter;
}

export class Filter {
  label: string;
  items: Item[];
  key?: string;
}
