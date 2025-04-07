import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MoviesService } from '@services/movies.service';
import { TopWinnersComponent } from './top-winners.component';

describe('TopWinnersComponent', () => {
  let component: TopWinnersComponent;
  let fixture: ComponentFixture<TopWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopWinnersComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MoviesService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
