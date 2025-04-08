import { AsyncPipe, NgIf } from '@angular/common';
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
import { CardComponent } from '@ui/card/card.component';
import { delay, of } from 'rxjs';
import { MovieWinnersByYearComponent } from './movie-winners-by-year.component';
import { MovieWinnersByYearSearchFormComponent } from './search-form/search-form.component';
import { MovieWinnersByYearTableComponent } from './table/table.component';

describe('MovieWinnersByYearComponent', () => {
  let component: MovieWinnersByYearComponent;
  let fixture: ComponentFixture<MovieWinnersByYearComponent>;
  let moviesService: MoviesService;
  const spyGetMovies = jasmine
    .createSpy('getMovies')
    .and.returnValue(of(movieDataMock).pipe(delay(2000)));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MovieWinnersByYearComponent,
        NgIf,
        AsyncPipe,
        CardComponent,
        MovieWinnersByYearSearchFormComponent,
        MovieWinnersByYearTableComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: MoviesService,
          useValue: {
            getMovies: spyGetMovies,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieWinnersByYearComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);

    spyGetMovies.calls.reset();
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should initialize with correct default state', () => {
    expect(component.loading()).toBeTrue();
    expect(component.hasError()).toBeFalse();
    expect(component.firstLoading()).toBeTrue();
    expect(component.lastYearValue()).toBe('');
  });

  it('should set variables properly after loading', fakeAsync(() => {
    fixture.detectChanges();
    tick(2000);

    expect(component.loading()).toBeFalse();
    expect(component.hasError()).toBeFalse();
    expect(component.firstLoading()).toBeFalse();
  }));

  it('should not display the search form initially', () => {
    fixture.detectChanges();

    const searchForm = fixture.debugElement.query(
      By.directive(MovieWinnersByYearSearchFormComponent)
    );
    expect(searchForm).toBeFalsy();
  });

  it('should display the search after first loading', fakeAsync(() => {
    fixture.detectChanges();
    tick(2000);

    fixture.detectChanges();
    const searchForm = fixture.debugElement.query(
      By.directive(MovieWinnersByYearSearchFormComponent)
    );
    expect(searchForm).toBeTruthy();
  }));

  it('should display the table initially', () => {
    fixture.detectChanges();

    const table = fixture.debugElement.query(
      By.directive(MovieWinnersByYearTableComponent)
    );
    expect(table).toBeTruthy();
  });

  it('should filter by year', fakeAsync(() => {
    const yearValue = '1920';
    fixture.detectChanges();
    tick(2000);

    fixture.detectChanges();
    const searchForm = fixture.debugElement.query(
      By.directive(MovieWinnersByYearSearchFormComponent)
    );
    searchForm.triggerEventHandler('onSearch', yearValue);
    tick(2000);
    fixture.detectChanges();

    expect(spyGetMovies).toHaveBeenCalledWith(
      jasmine.objectContaining({
        year: yearValue,
      })
    );
    expect(component.lastYearValue()).toBe(yearValue);
  }));

  it('should retry on trigger event', fakeAsync(() => {
    const yearValue = '1980';
    fixture.detectChanges();
    tick(2000);

    fixture.detectChanges();
    component.searchForm?.form.controls.year.setValue(yearValue);
    const table = fixture.debugElement.query(
      By.directive(MovieWinnersByYearTableComponent)
    );
    table.triggerEventHandler('onRetry', undefined);
    tick(2000);
    fixture.detectChanges();

    expect(spyGetMovies).toHaveBeenCalledWith(
      jasmine.objectContaining({
        year: yearValue,
      })
    );
    expect(component.lastYearValue()).toBe(yearValue);
  }));

  it('should retry on trigger event without search form', fakeAsync(() => {
    fixture.detectChanges();

    const table = fixture.debugElement.query(
      By.directive(MovieWinnersByYearTableComponent)
    );
    table.triggerEventHandler('onRetry', undefined);
    tick(2000);
    fixture.detectChanges();

    expect(spyGetMovies).toHaveBeenCalledTimes(2);
  }));
});
