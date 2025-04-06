import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MoviesService } from '@services/movies.service';
import { CardComponent } from '@ui/card/card.component';
import { withLoadingAndError } from '@utils/observable-loading-error.util';
import { BehaviorSubject, shareReplay, switchMap, tap } from 'rxjs';
import { StateComponent } from '../../../../ui/state/state.component';
import { ProducersIntervalTableComponent } from './producers-interval-table/producers-interval-table.component';

@Component({
  selector: 'app-producers-interval',
  imports: [
    AsyncPipe,
    CardComponent,
    ProducersIntervalTableComponent,
    StateComponent,
  ],
  templateUrl: './producers-interval.component.html',
  styleUrl: './producers-interval.component.scss',
})
export class ProducersIntervalComponent {
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
      this.moviesService
        .getProducersAwardsInterval()
        .pipe(
          withLoadingAndError(
            this.loading.set.bind(this.loading),
            this.hasError.set.bind(this.hasError)
          )
        )
    ),
    shareReplay(1)
  );

  onRetry() {
    this.fetch$.next();
  }
}
