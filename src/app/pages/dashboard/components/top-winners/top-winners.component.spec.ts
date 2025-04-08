import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { studiosWinCountMock } from '@mocks/studios-win-count.mock';
import { MoviesService } from '@services/movies.service';
import { TableComponent } from '@ui/table/table.component';
import { getTopWinners as getTopWinnersUtil } from '@utils/top-winners.util';
import { delay, of, throwError } from 'rxjs';
import { TopWinnersComponent } from './top-winners.component';

describe('TopWinnersComponent', () => {
  let component: TopWinnersComponent;
  let fixture: ComponentFixture<TopWinnersComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;

  const mockData = structuredClone(studiosWinCountMock);

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', [
      'getStudiosWithWinCount',
    ]);

    await TestBed.configureTestingModule({
      imports: [TopWinnersComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: MoviesService,
          useValue: moviesServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopWinnersComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(
      MoviesService
    ) as jasmine.SpyObj<MoviesService>;

    moviesService.getStudiosWithWinCount.and.returnValue(
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

  it('should pass the top winners to data', fakeAsync(() => {
    fixture.detectChanges();
    tick(2000);
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.directive(TableComponent));
    const { data } = table.componentInstance as TableComponent;

    const expectedData = getTopWinnersUtil(mockData.studios);
    expect(data()).toEqual(expectedData);
  }));

  it('should retry on trigger event', fakeAsync(() => {
    moviesService.getStudiosWithWinCount.and.returnValue(
      throwError(() => new Error('API Error'))
    );
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.directive(TableComponent));
    expect(table.componentInstance.hasError()).toBeTrue();

    moviesService.getStudiosWithWinCount.and.returnValue(
      of(mockData).pipe(delay(2000))
    );
    table.triggerEventHandler('onRetry', undefined);
    fixture.detectChanges();
    expect(table.componentInstance.hasError()).toBeFalsy();
    expect(moviesService.getStudiosWithWinCount).toHaveBeenCalledTimes(2);
  }));
});
