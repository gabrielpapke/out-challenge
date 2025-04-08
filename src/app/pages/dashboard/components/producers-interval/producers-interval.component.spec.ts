import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { producersIntervalMock } from '@mocks/producers-interval.mock';
import { MoviesService } from '@services/movies.service';
import { StateComponent } from '@ui/state/state.component';
import { delay, of, throwError } from 'rxjs';
import { ProducersIntervalTableComponent } from './producers-interval-table/producers-interval-table.component';
import { ProducersIntervalComponent } from './producers-interval.component';

describe('ProducersIntervalComponent', () => {
  let component: ProducersIntervalComponent;
  let fixture: ComponentFixture<ProducersIntervalComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', [
      'getProducersAwardsInterval',
    ]);

    await TestBed.configureTestingModule({
      imports: [ProducersIntervalComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: MoviesService,
          useValue: moviesServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProducersIntervalComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(
      MoviesService
    ) as jasmine.SpyObj<MoviesService>;

    moviesService.getProducersAwardsInterval.and.returnValue(
      of(structuredClone(producersIntervalMock)).pipe(delay(2000))
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

    const table = fixture.debugElement.queryAll(
      By.directive(ProducersIntervalTableComponent)
    );
    expect(table).toBeTruthy();
    expect(table.length).toEqual(2);
  }));

  it('should retry on trigger event', fakeAsync(() => {
    moviesService.getProducersAwardsInterval.and.returnValue(
      throwError(() => new Error('API Error'))
    );
    fixture.detectChanges();

    let table = fixture.debugElement.queryAll(
      By.directive(ProducersIntervalTableComponent)
    );
    expect(table.length).toBeFalsy();

    const state = fixture.debugElement.query(By.directive(StateComponent));
    expect(state).toBeTruthy();
    moviesService.getProducersAwardsInterval.and.returnValue(
      of(structuredClone(producersIntervalMock)).pipe(delay(2000))
    );
    state.triggerEventHandler('onRetry', undefined);
    fixture.detectChanges();

    table = fixture.debugElement.queryAll(
      By.directive(ProducersIntervalTableComponent)
    );
    expect(table.length).toEqual(2);
    expect(moviesService.getProducersAwardsInterval).toHaveBeenCalledTimes(2);
  }));
});
