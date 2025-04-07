import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl } from '@angular/forms';
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
  });

  it('should create', () => {
    fixture.componentRef.setInput('control', new FormControl());
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
