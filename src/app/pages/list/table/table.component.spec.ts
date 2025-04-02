import { ComponentFixture, TestBed } from '@angular/core/testing';

import { moviesMock } from 'src/mocks/movies.mock';
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
    fixture.componentRef.setInput('data', structuredClone(moviesMock));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
