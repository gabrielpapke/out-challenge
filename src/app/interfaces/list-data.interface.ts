export interface IListData<T> {
  content: T;
  pageable: IPageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  sort: ISort;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

export interface IPageable {
  sort: ISort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ISort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
