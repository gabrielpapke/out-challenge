import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieWinnersByYearSearchFormComponent } from './search-form.component';

describe('MovieWinnersByYearSearchFormComponent', () => {
  let component: MovieWinnersByYearSearchFormComponent;
  let fixture: ComponentFixture<MovieWinnersByYearSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieWinnersByYearSearchFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieWinnersByYearSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
