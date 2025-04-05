import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TableModule } from '@ui/table/table.component.module';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs';
import { IMovieData } from 'src/app/interfaces/list-movies.interface';
import { YesNoPipe } from 'src/app/pipes/yes-no.pipe';
import { IMovieFilter } from '../interfaces/movies-filter.interface';

@Component({
  selector: 'app-list-table',
  imports: [
    CommonModule,
    MatTableModule,
    TableModule,
    YesNoPipe,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTableComponent {
  private readonly defaultDebounceTime = 1000;
  private debounceTimeSubject = new BehaviorSubject<number>(
    this.defaultDebounceTime
  );

  data = input.required<IMovieData | null>();
  currentPage = input.required<number>();
  defaultPageLength = input.required<number>();
  loading = input.required<boolean>();
  hasError = input.required<boolean>();

  yesNoOptions = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ];

  onFilter = output<Partial<IMovieFilter>>();
  onPageChange = output<number>();

  form = new FormGroup({
    year: new FormControl('', {
      validators: [
        Validators.pattern(/^\d{4}$/),
        Validators.max(new Date().getFullYear()),
      ],
      nonNullable: true,
    }),
    winner: new FormControl('', {
      nonNullable: true,
    }),
  });

  constructor() {
    this.yearFilterValueChanges();
    this.winnerFilterValueChanges();
  }

  yearFilterValueChanges() {
    this.form.controls.year.valueChanges
      .pipe(
        tap(() => this.form.updateValueAndValidity()),
        switchMap(() =>
          this.debounceTimeSubject.pipe(
            debounceTime(this.debounceTimeSubject.value)
          )
        ),
        filter(() => this.form.controls.year.valid),
        takeUntilDestroyed()
      )
      .subscribe({
        next: this.emitFilter.bind(this),
      });
  }

  clearYearFilter() {
    this.debounceTimeSubject.next(0);

    this.form.controls.year.reset();

    setTimeout(
      () => this.debounceTimeSubject.next(this.defaultDebounceTime),
      0
    );
  }

  winnerFilterValueChanges() {
    this.form.controls.winner.valueChanges
      .pipe(
        tap(() => this.form.updateValueAndValidity()),
        distinctUntilChanged(),
        takeUntilDestroyed(),
        filter(() => this.form.valid)
      )
      .subscribe({
        next: this.emitFilter.bind(this),
      });
  }

  pageChange(event: PageEvent) {
    this.onPageChange.emit(event.pageIndex);
  }

  emitFilter() {
    const { winner, year } = this.form.value;

    const filterValues = this.mountFilter({ winner, year });

    this.onFilter.emit(filterValues);
  }

  mountFilter({ year, winner }: Partial<IMovieFilter>): Partial<IMovieFilter> {
    const filter: Partial<IMovieFilter> = {};

    if (year) {
      filter.year = year;
    }

    if (winner) {
      filter.winner = winner;
    }

    return filter;
  }
}
