import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl } from '@angular/forms';
import { YearHeaderCellComponent } from './year-header-cell.component';

describe('YearHeaderCellComponent', () => {
  let component: YearHeaderCellComponent;
  let fixture: ComponentFixture<YearHeaderCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearHeaderCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YearHeaderCellComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('control', new FormControl());
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
