import { Component, output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CustomValidators } from '@validators/custom.validators';

@Component({
  selector: 'app-movie-winners-by-year-search-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class MovieWinnersByYearSearchFormComponent {
  onSearch = output<string>();

  lastValueFiltered = signal('');
  form = new FormGroup({
    year: new FormControl('', {
      validators: [CustomValidators.year()],
      nonNullable: true,
    }),
  });

  onClearYearFilter() {
    if (this.lastValueFiltered()) {
      this.lastValueFiltered.set('');
      this.onSearch.emit('');
    }

    this.form.controls.year.reset();
  }

  onSubmit() {
    const value = this.form.controls.year.value;

    this.lastValueFiltered.set(value);

    this.onSearch.emit(value);
  }
}
