import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
