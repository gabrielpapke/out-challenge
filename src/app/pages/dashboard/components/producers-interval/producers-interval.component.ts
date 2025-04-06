import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MoviesService } from '@services/movies.service';
import { CardComponent } from '@ui/card/card.component';
import { withLoadingAndError } from '@utils/observable-loading-error.util';
import { shareReplay } from 'rxjs';
import { ProducersIntervalTableComponent } from './producers-interval-table/producers-interval-table.component';

@Component({
  selector: 'app-producers-interval',
  imports: [AsyncPipe, CardComponent, ProducersIntervalTableComponent],
  templateUrl: './producers-interval.component.html',
  styleUrl: './producers-interval.component.scss',
})
export class ProducersIntervalComponent {
  moviesService = inject(MoviesService);

  loading = signal(true);
  hasError = signal(false);

  data$ = this.moviesService
    .getProducersAwardsInterval()
    .pipe(
      withLoadingAndError(
        this.loading.set.bind(this.loading),
        this.hasError.set.bind(this.hasError)
      ),
      shareReplay(1)
    );
}
