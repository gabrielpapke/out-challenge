import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearHeaderCellComponent } from './year-header-cell.component';

describe('YearHeaderCellComponent', () => {
  let component: YearHeaderCellComponent;
  let fixture: ComponentFixture<YearHeaderCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearHeaderCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearHeaderCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
