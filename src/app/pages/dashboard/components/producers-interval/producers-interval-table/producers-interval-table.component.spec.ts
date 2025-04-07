import { ComponentFixture, TestBed } from '@angular/core/testing';

import { producersIntervalMock } from '@mocks/producers-interval.mock';
import { ProducersIntervalTableComponent } from './producers-interval-table.component';

describe('ProducersIntervalTableComponent', () => {
  let component: ProducersIntervalTableComponent;
  let fixture: ComponentFixture<ProducersIntervalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducersIntervalTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProducersIntervalTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('title', 'test title');
    fixture.componentRef.setInput(
      'data',
      structuredClone(producersIntervalMock.max)
    );
    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('hasError', false);

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
