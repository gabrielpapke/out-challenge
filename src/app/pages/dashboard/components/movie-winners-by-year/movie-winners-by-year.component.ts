import { Component, inject, signal } from '@angular/core';

import { AsyncPipe, NgIf } from '@angular/common';
import { IMovieFilter } from '@pages/list/interfaces/movies-filter.interface';
import { MoviesService } from '@services/movies.service';
import { CardComponent } from '@ui/card/card.component';
import { withLoadingAndError } from '@utils/observable-loading-error.util';
import { BehaviorSubject, finalize, switchMap } from 'rxjs';
import { MovieWinnersByYearSearchFormComponent } from './search-form/search-form.component';
import { MovieWinnersByYearTableComponent } from './table/table.component';

@Component({
  selector: 'app-movie-winners-by-year',
  imports: [
    AsyncPipe,
    NgIf,
    CardComponent,
    MovieWinnersByYearSearchFormComponent,
    MovieWinnersByYearTableComponent,
  ],
  templateUrl: './movie-winners-by-year.component.html',
  styleUrl: './movie-winners-by-year.component.scss',
})
export class MovieWinnersByYearComponent {
  moviesService = inject(MoviesService);

  private readonly defaultParams: Partial<IMovieFilter> = {
    page: 0,
    size: 999,
    winner: 'true',
  };

  loading = signal(true);
  hasError = signal(false);
  firstLoading = signal(true);

  year$ = new BehaviorSubject<string>('');

  data$ = this.year$.pipe(
    switchMap((year) => {
      this.loading.set(true);
      this.hasError.set(false);

      const params = this.mountFilter(year);

      return this.moviesService.getMovies(params).pipe(
        withLoadingAndError(
          this.loading.set.bind(this.loading),
          this.hasError.set.bind(this.hasError)
        ),
        finalize(() => this.firstLoading.set(false))
      );
    })
  );

  mountFilter(year: string): Partial<IMovieFilter> {
    const filter: Partial<IMovieFilter> = { ...this.defaultParams };

    if (year) {
      filter.year = year;
    }

    return filter;
  }

  onSearch(year: string) {
    this.year$.next(year);
  }
}
