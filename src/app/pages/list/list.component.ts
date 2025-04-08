import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MoviesService } from '@services/movies.service';
import { CardComponent } from '@ui/card/card.component';
import { withLoadingAndError } from '@utils/observable-loading-error.util';
import { BehaviorSubject, shareReplay, switchMap, tap } from 'rxjs';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ListTableComponent } from './components/table/table.component';
import {
  IMovieFilterDefaultParams,
  IMovieFilterOptionalParams,
  IMovieFilterParams,
} from './interfaces/movies-filter.interface';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    CardComponent,
    ListTableComponent,
    PaginatorComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  private readonly defaultInitialPage = 0;
  protected readonly defaultPageLength = 15;
  public readonly defaultParams: IMovieFilterDefaultParams = {
    page: this.defaultInitialPage,
    size: this.defaultPageLength,
  };
  private params$ = new BehaviorSubject<IMovieFilterParams>(this.defaultParams);

  moviesService = inject(MoviesService);
  loading = signal(true);
  hasError = signal(false);
  currentPage = signal(this.defaultInitialPage);
  currentFilter = signal<IMovieFilterParams>(this.defaultParams);

  protected getMovies$ = this.params$.pipe(
    tap(() => {
      this.loading.set(true);
      this.hasError.set(false);
    }),
    switchMap((params) => {
      this.currentPage.set(params.page);
      this.currentFilter.set(params);

      return this.moviesService
        .getMovies(params)
        .pipe(
          withLoadingAndError(
            this.loading.set.bind(this.loading),
            this.hasError.set.bind(this.hasError)
          )
        );
    }),
    shareReplay(1)
  );

  onPageChange(page: number) {
    this.params$.next({ ...this.currentFilter(), page });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onFilter(filter: IMovieFilterOptionalParams) {
    this.params$.next({ ...this.defaultParams, ...filter });
  }
}
