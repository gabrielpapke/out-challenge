import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';
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

    spyOn(component.onPageChange, 'emit');

    fixture.componentRef.setInput('data', { content: [] });
    fixture.componentRef.setInput('currentPage', 0);
    fixture.componentRef.setInput('defaultPageLength', 15);
    fixture.componentRef.setInput('loading', false);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should hide component', () => {
    fixture.detectChanges();

    const paginator = fixture.debugElement.query(By.directive(MatPaginator));
    expect(paginator).toBeFalsy();
  });

  it('should show component', () => {
    fixture.componentRef.setInput('data', { content: [1, 2, 3] });
    fixture.detectChanges();

    const paginator = fixture.debugElement.query(By.directive(MatPaginator));
    expect(paginator).toBeTruthy();
  });

  it('should emit page event', () => {
    const data = { content: [1, 2, 3] };
    const newPageIndexValue = 1;
    fixture.componentRef.setInput('data', data);
    fixture.detectChanges();

    const paginator = fixture.debugElement.query(By.directive(MatPaginator));
    const pageEvent: PageEvent = {
      pageIndex: newPageIndexValue,
      pageSize: component.defaultPageLength(),
      length: data.content.length,
    };
    paginator.triggerEventHandler('page', pageEvent);
    expect(component.onPageChange.emit).toHaveBeenCalledWith(newPageIndexValue);
  });
});
