import { Component, inject, signal } from '@angular/core';

import { AsyncPipe, NgIf } from '@angular/common';
import { MoviesService } from '@services/movies.service';
import { CardComponent } from '@ui/card/card.component';
import { withLoadingAndError } from '@utils/observable-loading-error.util';
import { finalize, shareReplay } from 'rxjs';
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

  loading = signal(true);
  hasError = signal(false);
  firstLoading = signal(true);

  data$ = this.moviesService
    .getMovies({ page: 0, size: 999, winner: true })
    .pipe(
      withLoadingAndError(
        this.loading.set.bind(this.loading),
        this.hasError.set.bind(this.hasError)
      ),
      finalize(() => this.firstLoading.set(false)),
      shareReplay(1)
    );
}
