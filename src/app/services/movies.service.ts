import { Injectable } from '@angular/core';
import { IProducersInterval } from '@pages/dashboard/components/producers-interval/producers-interval.interface';
import { IStudioTopWinner } from '@pages/dashboard/components/top-winners/top-winners.interface';
import { IYearsMultipleWinners } from '@pages/dashboard/components/years-multiple-winners/years-multiple-winners.interface';
import { Observable } from 'rxjs';
import { IMovieData } from '../interfaces/list-movies.interface';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService extends BaseApiService {
  getMovies(params?: { [key: string]: any }): Observable<IMovieData> {
    return this.get<IMovieData>('movies', params);
  }

  getYearsMultipleWinners() {
    return this.get<IYearsMultipleWinners>('movies', {
      projection: 'years-with-multiple-winners',
    });
  }

  getStudiosWithWinCount() {
    return this.get<IStudioTopWinner>('movies', {
      projection: 'studios-with-win-count',
    });
  }

  getProducersAwardsInterval() {
    return this.get<IProducersInterval>('movies', {
      projection: 'max-min-win-interval-for-producers',
    });
  }
}
