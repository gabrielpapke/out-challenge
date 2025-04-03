import { ComponentFixture, TestBed } from '@angular/core/testing';

import { moviesMock } from '@mocks/movies-content.mock';
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
  });

  it('should create', () => {
    fixture.componentRef.setInput('data', structuredClone(moviesMock));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
