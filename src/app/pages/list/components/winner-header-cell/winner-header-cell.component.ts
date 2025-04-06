import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-winner-header-cell',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './winner-header-cell.component.html',
  styleUrl: './winner-header-cell.component.scss',
})
export class WinnerHeaderCellComponent {
  control = input.required<FormControl<string>>();
  onClearWinnerFilter = output<void>();
  yesNoOptions = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ];

  clearWinnerFilter(event: Event) {
    event.stopPropagation();

    this.onClearWinnerFilter.emit();
  }
}
