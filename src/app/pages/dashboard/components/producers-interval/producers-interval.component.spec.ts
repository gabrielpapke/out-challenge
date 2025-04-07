import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MoviesService } from '@services/movies.service';
import { ProducersIntervalComponent } from './producers-interval.component';

describe('ProducersIntervalComponent', () => {
  let component: ProducersIntervalComponent;
  let fixture: ComponentFixture<ProducersIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducersIntervalComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MoviesService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProducersIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
