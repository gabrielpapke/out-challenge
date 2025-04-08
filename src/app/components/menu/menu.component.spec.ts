import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatListItem } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;

    spyOn(component.onCloseButtonClick, 'emit');
    spyOn(component.onMenuItemClick, 'emit');
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should emit close menu on click', () => {
    fixture.detectChanges();

    const closeMenuButton = fixture.debugElement.query(
      By.css('[data-test-id=close-menu]')
    );
    closeMenuButton.nativeElement.click();

    expect(component.onCloseButtonClick.emit).toHaveBeenCalled();
  });

  it('should emit item menu click', () => {
    fixture.detectChanges();

    const itemMenu = fixture.debugElement.query(By.directive(MatListItem));
    itemMenu.nativeElement.click();

    expect(component.onMenuItemClick.emit).toHaveBeenCalled();
  });
});
