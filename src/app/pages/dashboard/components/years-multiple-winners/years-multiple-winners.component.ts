import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MoviesService } from '@services/movies.service';
import { CardComponent } from '@ui/card/card.component';
import { TableModule } from '@ui/table/table.component.module';
import { withLoadingAndError } from '@utils/observable-loading-error.util';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-years-multiple-winners',
  imports: [AsyncPipe, CardComponent, TableModule],
  templateUrl: './years-multiple-winners.component.html',
  styleUrl: './years-multiple-winners.component.scss',
})
export class YearsMultipleWinnersComponent {
  moviesService = inject(MoviesService);

  loading = signal(true);
  hasError = signal(false);

  private fetch$ = new BehaviorSubject<void>(undefined);

  data$ = this.fetch$.pipe(
    tap(() => {
      this.loading.set(true);
      this.hasError.set(false);
    }),
    switchMap(() =>
      this.moviesService.getYearsMultipleWinners().pipe(
        map((data) => data.years),
        withLoadingAndError(
          this.loading.set.bind(this.loading),
          this.hasError.set.bind(this.hasError)
        )
      )
    )
  );

  onRetry() {
    this.fetch$.next();
  }
}
