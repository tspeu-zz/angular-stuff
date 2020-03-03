export class Paginated {
    page = 1;
    pageSize = 24;
}

export class PaginationControlsConfig {
  previousLabel = '';
  nextLabel = '';
  maxSize = 5;
}

export class PaginatedResult<T> {
  total: number;
  items: T[];
}
