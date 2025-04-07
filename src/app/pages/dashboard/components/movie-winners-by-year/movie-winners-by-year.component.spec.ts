import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MoviesService } from '@services/movies.service';
import { MovieWinnersByYearComponent } from './movie-winners-by-year.component';

describe('MovieWinnersByYearComponent', () => {
  let component: MovieWinnersByYearComponent;
  let fixture: ComponentFixture<MovieWinnersByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieWinnersByYearComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MoviesService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieWinnersByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
