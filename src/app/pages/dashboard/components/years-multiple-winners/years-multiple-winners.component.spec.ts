import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { multipleWinnersMock } from '@mocks/multiple-winners.mock';
import { MoviesService } from '@services/movies.service';
import { TableComponent } from '@ui/table/table.component';
import { delay, of, throwError } from 'rxjs';
import { YearsMultipleWinnersComponent } from './years-multiple-winners.component';

describe('YearsMultipleWinnersComponent', () => {
  let component: YearsMultipleWinnersComponent;
  let fixture: ComponentFixture<YearsMultipleWinnersComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;

  const mockData = structuredClone(multipleWinnersMock);

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', [
      'getYearsMultipleWinners',
    ]);

    await TestBed.configureTestingModule({
      imports: [YearsMultipleWinnersComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: MoviesService,
          useValue: moviesServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(YearsMultipleWinnersComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(
      MoviesService
    ) as jasmine.SpyObj<MoviesService>;

    moviesService.getYearsMultipleWinners.and.returnValue(
      of(mockData).pipe(delay(2000))
    );
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should initialize with correct default state', () => {
    fixture.detectChanges();

    expect(component.loading()).toBeTrue();
    expect(component.hasError()).toBeFalse();
  });

  it('should set variables properly after loading', fakeAsync(() => {
    fixture.detectChanges();
    tick(2000);

    expect(component.loading()).toBeFalse();
    expect(component.hasError()).toBeFalse();
  }));

  it('should display the table initially', fakeAsync(() => {
    fixture.detectChanges();
    tick(2000);
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.directive(TableComponent));
    expect(table).toBeTruthy();
  }));

  it('should pass the years to data', fakeAsync(() => {
    fixture.detectChanges();
    tick(2000);
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.directive(TableComponent));
    const { data } = table.componentInstance as TableComponent;

    const expectedData = mockData.years;
    expect(data()).toEqual(expectedData);
  }));

  it('should retry on trigger event', fakeAsync(() => {
    moviesService.getYearsMultipleWinners.and.returnValue(
      throwError(() => new Error('API Error'))
    );
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.directive(TableComponent));
    expect(table.componentInstance.hasError()).toBeTrue();

    moviesService.getYearsMultipleWinners.and.returnValue(
      of(mockData).pipe(delay(2000))
    );
    table.triggerEventHandler('onRetry', undefined);
    fixture.detectChanges();
    expect(table.componentInstance.hasError()).toBeFalsy();
    expect(moviesService.getYearsMultipleWinners).toHaveBeenCalledTimes(2);
  }));
});
