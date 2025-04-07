export interface IListData<T> {
  content: T;
  pageable: IPageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
  };
  number: number;
  numberOfElements: number;
  size: number;
}

export interface IPageable {
  sort: {
    sorted: boolean;
    unsorted: boolean;
  };
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
