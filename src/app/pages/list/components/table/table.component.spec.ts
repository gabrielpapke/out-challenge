import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { movieDataMock } from '@mocks/movies-data.mock';
import { TableModule } from '@ui/table/table.component.module';
import { YesNoPipe } from 'src/app/pipes/yes-no.pipe';
import { WinnerHeaderCellComponent } from '../winner-header-cell/winner-header-cell.component';
import { YearHeaderCellComponent } from '../year-header-cell/year-header-cell.component';
import { ListTableComponent } from './table.component';

describe('ListTableComponent', () => {
  let component: ListTableComponent;
  let fixture: ComponentFixture<ListTableComponent>;
  let spyOnFilter: jasmine.Spy;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TableModule,
        YesNoPipe,
        FormsModule,
        ReactiveFormsModule,
        YearHeaderCellComponent,
        WinnerHeaderCellComponent,
        ListTableComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListTableComponent);
    component = fixture.componentInstance;

    spyOnFilter = spyOn(component.onFilter, 'emit');

    fixture.componentRef.setInput('data', structuredClone(movieDataMock));
    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('hasError', false);
    fixture.componentRef.setInput('defaultPageLength', 15);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should emit year value after debounce time', fakeAsync(() => {
    const newYearValue = '1920';
    fixture.detectChanges();

    component.form.controls.year.setValue(newYearValue);
    fixture.detectChanges();
    tick(1000);
    expect(component.onFilter.emit).toHaveBeenCalledWith({
      year: newYearValue,
    });
  }));

  it('should emit winner value after change', () => {
    const newWinnerValue = 'true';
    fixture.detectChanges();

    component.form.controls.winner.setValue(newWinnerValue);
    fixture.detectChanges();
    expect(component.onFilter.emit).toHaveBeenCalledWith({
      winner: newWinnerValue,
    });
  });

  it('should emit filter with both value', () => {
    const newWinnerValue = 'true';
    const newYearValue = '1920';
    fixture.detectChanges();

    component.form.controls.year.setValue(newYearValue);
    component.form.controls.winner.setValue(newWinnerValue);
    fixture.detectChanges();

    expect(component.onFilter.emit).toHaveBeenCalledWith({
      winner: newWinnerValue,
      year: newYearValue,
    });
  });

  it('should not emit filter with year invalid', () => {
    fixture.detectChanges();

    component.form.controls.year.setValue('192');
    fixture.detectChanges();

    expect(component.onFilter.emit).not.toHaveBeenCalled();
  });

  it('should clear winner filter value', () => {
    const year = '1920';
    fixture.detectChanges();

    component.form.setValue({
      year,
      winner: 'true',
    });
    fixture.detectChanges();

    const winnerHeaderCell = fixture.debugElement.query(
      By.directive(WinnerHeaderCellComponent)
    );
    winnerHeaderCell.triggerEventHandler('onClearWinnerFilter', null);
    fixture.detectChanges();

    expect(component.form.value.winner).toBeFalsy();
    expect(component.form.value.year).toBeTruthy();

    const lastCall = spyOnFilter.calls.mostRecent();
    expect(lastCall.args[0]).toEqual({
      year,
    });
  });

  it('should clear year filter value', fakeAsync(() => {
    const winner = 'true';
    fixture.detectChanges();

    component.form.setValue({
      year: '1920',
      winner,
    });
    fixture.detectChanges();
    tick(1000);

    const yearHeaderCell = fixture.debugElement.query(
      By.directive(YearHeaderCellComponent)
    );
    yearHeaderCell.triggerEventHandler('onClearYearFilter', null);
    fixture.detectChanges();
    tick(0);

    expect(component.form.value.winner).toBeTruthy();
    expect(component.form.value.year).toBeFalsy();
    const lastCall = spyOnFilter.calls.mostRecent();
    expect(lastCall.args[0]).toEqual({
      winner,
    });
  }));
});
