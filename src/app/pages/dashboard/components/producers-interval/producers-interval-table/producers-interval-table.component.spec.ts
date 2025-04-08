import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { producersIntervalMock } from '@mocks/producers-interval.mock';
import { TableComponent } from '@ui/table/table.component';
import { IProducerIntervalItem } from '../producers-interval.interface';
import { ProducersIntervalTableComponent } from './producers-interval-table.component';

describe('ProducersIntervalTableComponent', () => {
  let component: ProducersIntervalTableComponent;
  let fixture: ComponentFixture<ProducersIntervalTableComponent>;
  let mockData: IProducerIntervalItem[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducersIntervalTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProducersIntervalTableComponent);
    component = fixture.componentInstance;

    mockData = structuredClone(producersIntervalMock.max);
    fixture.componentRef.setInput('title', 'test title');
    fixture.componentRef.setInput('data', mockData);
    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('hasError', false);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should pass data to app table', () => {
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.directive(TableComponent));
    const { data, loading, hasError } =
      table.componentInstance as TableComponent;

    expect(data()).toEqual(mockData);
    expect(loading()).toEqual(false);
    expect(hasError()).toEqual(false);
  });

  it('should pass loading to app table', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.directive(TableComponent));
    const { loading } = table.componentInstance as TableComponent;

    expect(loading()).toEqual(true);
  });
});
