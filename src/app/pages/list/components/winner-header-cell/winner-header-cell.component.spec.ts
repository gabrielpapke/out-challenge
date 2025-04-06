import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerHeaderCellComponent } from './winner-header-cell.component';

describe('WinnerHeaderCellComponent', () => {
  let component: WinnerHeaderCellComponent;
  let fixture: ComponentFixture<WinnerHeaderCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnerHeaderCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinnerHeaderCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
