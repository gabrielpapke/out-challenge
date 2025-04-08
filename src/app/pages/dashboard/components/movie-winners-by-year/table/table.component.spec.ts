import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { moviesMock } from '@mocks/movies-content.mock';
import { TableComponent } from '@ui/table/table.component';
import { MovieWinnersByYearTableComponent } from './table.component';

describe('MovieWinnersByYearTableComponent', () => {
  let component: MovieWinnersByYearTableComponent;
  let fixture: ComponentFixture<MovieWinnersByYearTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieWinnersByYearTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieWinnersByYearTableComponent);
    component = fixture.componentInstance;

    spyOn(component.onRetry, 'emit');

    fixture.componentRef.setInput('data', structuredClone(moviesMock));
    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('hasError', false);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should pass data to app table', () => {
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.directive(TableComponent));
    const { data, loading, hasError } =
      table.componentInstance as TableComponent;

    expect(data()).toEqual(structuredClone(moviesMock));
    expect(loading()).toEqual(false);
    expect(hasError()).toEqual(false);
  });

  it('should pass loading to app table', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.directive(TableComponent));
    const { loading } = table.componentInstance as TableComponent;

    expect(loading()).toEqual(true);
  });

  it('should call onRetry', () => {
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.directive(TableComponent));
    table.triggerEventHandler('onRetry', undefined);

    expect(component.onRetry.emit).toHaveBeenCalled();
  });
});
