import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { WinnerHeaderCellComponent } from './winner-header-cell.component';

describe('WinnerHeaderCellComponent', () => {
  let component: WinnerHeaderCellComponent;
  let fixture: ComponentFixture<WinnerHeaderCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnerHeaderCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WinnerHeaderCellComponent);
    component = fixture.componentInstance;

    spyOn(component.onClearWinnerFilter, 'emit');
  });

  it('should create', () => {
    fixture.componentRef.setInput('control', new FormControl(''));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should display the clear button when a value is selected', () => {
    fixture.componentRef.setInput('control', new FormControl('true'));
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(
      By.css('button[mat-icon-button]')
    );
    expect(clearButton).toBeTruthy();
  });

  it('should call clearWinnerFilter when the clear button is clicked', () => {
    fixture.componentRef.setInput('control', new FormControl('true'));
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(
      By.css('button[mat-icon-button]')
    );
    clearButton.nativeElement.click();

    expect(clearButton).toBeTruthy();
    expect(component.onClearWinnerFilter.emit).toHaveBeenCalled();
  });

  it('should not display the close button when no value is selected', () => {
    fixture.componentRef.setInput('control', new FormControl(''));
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(
      By.css('button[mat-icon-button]')
    );

    expect(clearButton).toBeFalsy();
  });
});
