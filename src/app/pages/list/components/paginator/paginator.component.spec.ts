import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('data', []);
    fixture.componentRef.setInput('currentPage', 0);
    fixture.componentRef.setInput('defaultPageLength', 15);
    fixture.componentRef.setInput('loading', false);

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
