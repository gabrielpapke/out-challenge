import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersIntervalTableComponent } from './producers-interval-table.component';

describe('ProducersIntervalTableComponent', () => {
  let component: ProducersIntervalTableComponent;
  let fixture: ComponentFixture<ProducersIntervalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducersIntervalTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducersIntervalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
