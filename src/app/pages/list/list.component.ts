import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MoviesService } from '@services/movies.service';
import { CardComponent } from '@ui/card/card.component';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  finalize,
  shareReplay,
  switchMap,
} from 'rxjs';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ListTableComponent } from './components/table/table.component';
import { IMovieFilter } from './interfaces/movies-filter.interface';

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
  providers: [MoviesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  protected readonly defaultPageLength = 15;
  protected readonly defaultParams: Partial<IMovieFilter> = {
    page: 0,
    size: this.defaultPageLength,
  };
  private params$ = new BehaviorSubject<Partial<IMovieFilter>>(
    this.defaultParams
  );

  moviesService = inject(MoviesService);
  loading = signal(true);
  hasError = signal(false);
  currentPage = signal(0);
  currentFilter = signal<Partial<IMovieFilter>>(this.defaultParams);

  protected getMovies$ = this.params$.pipe(
    switchMap((params) => {
      this.loading.set(true);
      this.hasError.set(false);
      this.currentPage.set(params.page ?? 0);
      this.currentFilter.set(params);

      return this.moviesService.getMovies(params).pipe(
        finalize(() => {
          this.loading.set(false);
        }),
        catchError(() => {
          this.hasError.set(true);
          return EMPTY;
        })
      );
    }),
    shareReplay(1)
  );

  onPageChange(page: number) {
    this.params$.next({ ...this.currentFilter(), page });
  }

  onFilter(filter: Partial<IMovieFilter>) {
    this.params$.next({ ...this.defaultParams, ...filter });
  }
}
