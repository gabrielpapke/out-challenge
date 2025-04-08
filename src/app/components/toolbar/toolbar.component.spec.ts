import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconButton } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;

    spyOn(component.onMenuClick, 'emit');
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should emit event menu on click', () => {
    fixture.detectChanges();

    const menuButton = fixture.debugElement.query(By.directive(MatIconButton));
    menuButton.nativeElement.click();

    expect(component.onMenuClick.emit).toHaveBeenCalled();
  });
});
