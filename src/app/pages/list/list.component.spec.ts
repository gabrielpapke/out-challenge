import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { movieDataMock } from '@mocks/movies-data.mock';
import { MoviesService } from '@services/movies.service';
import { delay, of, throwError } from 'rxjs';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ListTableComponent } from './components/table/table.component';
import { IMovieFilterOptionalParams } from './interfaces/movies-filter.interface';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;

  const mockData = structuredClone(movieDataMock);

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', [
      'getMovies',
    ]);

    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MoviesService, useValue: moviesServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(
      MoviesService
    ) as jasmine.SpyObj<MoviesService>;

    moviesService.getMovies.and.returnValue(of(mockData).pipe(delay(2000)));
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should initialize with loading true and hasError false', () => {
    expect(component.loading()).toBeTrue();
    expect(component.hasError()).toBeFalse();
    expect(component.currentPage()).toBe(0);
    expect(component.currentFilter()).toEqual({ page: 0, size: 15 });
  });

  it('should call getMovies with default params on initialization', fakeAsync(() => {
    fixture.detectChanges();
    tick(2000);
    fixture.detectChanges();

    expect(moviesService.getMovies).toHaveBeenCalledOnceWith(
      component.defaultParams
    );
  }));

  it('should pass error to app list table component', fakeAsync(() => {
    moviesService.getMovies.and.returnValue(
      throwError(() => new Error('API Error'))
    );
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.directive(ListTableComponent));
    expect(table.componentInstance.hasError()).toBeTrue();
  }));

  it('should hide paginator on error', fakeAsync(() => {
    moviesService.getMovies.and.returnValue(
      throwError(() => new Error('API Error'))
    );
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.directive(ListTableComponent));
    expect(table).toBeTruthy();

    const paginator = fixture.debugElement.query(
      By.directive(PaginatorComponent)
    );
    expect(paginator).toBeFalsy();
  }));

  it('should fetch data on page change', fakeAsync(() => {
    const newPageValue = 1;
    fixture.detectChanges();
    tick(2000);
    fixture.detectChanges();

    const paginator = fixture.debugElement.query(
      By.directive(PaginatorComponent)
    );
    paginator.triggerEventHandler('onPageChange', newPageValue);
    tick(2000);
    fixture.detectChanges();
    const { currentPage } = paginator.componentInstance as PaginatorComponent;

    expect(moviesService.getMovies).toHaveBeenCalledTimes(2);
    expect(moviesService.getMovies).toHaveBeenCalledWith(
      jasmine.objectContaining({
        page: newPageValue,
      })
    );
    expect(currentPage()).toEqual(newPageValue);
  }));

  it('should fetch data on filter change', fakeAsync(() => {
    const newFilterValue: IMovieFilterOptionalParams = {
      winner: 'true',
      year: '1980',
    };
    fixture.detectChanges();
    tick(2000);
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.directive(ListTableComponent));
    table.triggerEventHandler('onFilter', newFilterValue);
    tick(2000);

    expect(moviesService.getMovies).toHaveBeenCalledTimes(2);
    expect(moviesService.getMovies).toHaveBeenCalledWith(
      jasmine.objectContaining({ ...newFilterValue })
    );
  }));
});
