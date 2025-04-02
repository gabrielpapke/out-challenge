import { ComponentFixture, TestBed } from '@angular/core/testing';

import { producersIntervalMock } from 'src/mocks/producers-interval.mock';
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
      'dataSource',
      structuredClone(producersIntervalMock.max)
    );
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
