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
import { BehaviorSubject, finalize, shareReplay, switchMap } from 'rxjs';
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
  moviesService = inject(MoviesService);
  loading = signal(true);

  private params$ = new BehaviorSubject<{ page: number }>({ page: 0 });

  getMovies$ = this.params$.pipe(
    switchMap((params) => {
      this.loading.set(true);

      return this.moviesService.getMovies(params).pipe(
        finalize(() => {
          this.loading.set(false);
        })
      );
    }),
    shareReplay(1)
  );

  onPageChange(page: number) {
    this.params$.next({ page });
  }
}
