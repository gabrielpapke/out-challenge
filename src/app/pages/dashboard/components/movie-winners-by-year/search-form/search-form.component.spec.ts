import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { MovieWinnersByYearSearchFormComponent } from './search-form.component';

describe('MovieWinnersByYearSearchFormComponent', () => {
  let component: MovieWinnersByYearSearchFormComponent;
  let fixture: ComponentFixture<MovieWinnersByYearSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieWinnersByYearSearchFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieWinnersByYearSearchFormComponent);
    component = fixture.componentInstance;

    spyOn(component.onSearch, 'emit');
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should submit form', () => {
    const newYearValue = '1920';
    fixture.detectChanges();

    component.form.controls.year.setValue(newYearValue);
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(
      By.css('button[type=submit]')
    );
    expect(submitButton.nativeElement.disabled).toBeFalse();
    submitButton.nativeElement.click();

    expect(component.lastValueFiltered()).toEqual(newYearValue);
    expect(component.onSearch.emit).toHaveBeenCalledWith(newYearValue);
  });

  it('should clear year filter without emit search', () => {
    const newYearValue = '1920';
    fixture.detectChanges();

    component.form.controls.year.setValue(newYearValue);
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(
      By.css('[data-test-id=clear-button]')
    );
    clearButton.nativeElement.click();

    expect(component.onSearch.emit).not.toHaveBeenCalled();
    expect(component.form.controls.year.value).toBeFalsy();
  });

  it('should emit event search on clear', () => {
    const newYearValue = '1920';
    fixture.detectChanges();

    component.form.controls.year.setValue(newYearValue);
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(
      By.css('button[type=submit]')
    );
    submitButton.nativeElement.click();
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(
      By.css('[data-test-id=clear-button]')
    );
    clearButton.nativeElement.click();

    expect(component.onSearch.emit).toHaveBeenCalledWith('');
    expect(component.lastValueFiltered()).toBeFalsy();
    expect(component.form.controls.year.value).toBeFalsy();
  });

  it('should disable the submit button when the form is invalid', () => {
    fixture.detectChanges();

    component.form.controls.year.setValue('192');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(
      By.css('.submit-button')
    ).nativeElement;
    submitButton.click();
    expect(submitButton.disabled).toBeTrue();
    expect(component.onSearch.emit).not.toHaveBeenCalled();
  });
});
