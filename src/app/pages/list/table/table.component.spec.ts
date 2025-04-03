import { ComponentFixture, TestBed } from '@angular/core/testing';

import { movieDataMock } from '@mocks/movies-data.mock';
import { ListTableComponent } from './table.component';

describe('ListTableComponent', () => {
  let component: ListTableComponent;
  let fixture: ComponentFixture<ListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('data', structuredClone(movieDataMock));
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
