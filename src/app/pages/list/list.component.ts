import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MoviesService } from '@services/movies.service';
import { CardComponent } from '@ui/card/card.component';
import { BehaviorSubject, catchError, finalize, switchMap } from 'rxjs';
import { IMovieFilter } from './interfaces/movies-filter.interface';
import { ListTableComponent } from './table/table.component';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    CardComponent,
    MatPaginatorModule,
    ListTableComponent,
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

  moviesService = inject(MoviesService);
  loading = signal(true);
  hasError = signal(false);
  currentPage = signal(0);

  currentFilter = signal<Partial<IMovieFilter>>(this.defaultParams);

  private params$ = new BehaviorSubject<Partial<IMovieFilter>>(
    this.defaultParams
  );

  getMovies$ = this.params$.pipe(
    switchMap((params) => {
      this.loading.set(true);
      this.hasError.set(false);
      this.currentPage.set(params.page ?? 0);
      this.currentFilter.set(params);
      console.log(params);

      return this.moviesService.getMovies(params).pipe(
        finalize(() => {
          this.loading.set(false);
        }),
        catchError(() => {
          this.hasError.set(true);
          return [];
        })
      );
    })
  );

  onPageChange(page: number) {
    this.params$.next({ ...this.currentFilter(), page });
  }

  onFilter(filter: Partial<IMovieFilter>) {
    this.params$.next({ ...this.defaultParams, ...filter });
  }
}
