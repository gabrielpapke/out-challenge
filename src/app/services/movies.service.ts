import { Injectable } from '@angular/core';
import { IYearsMultipleWinners } from '@pages/dashboard/components/years-multiple-winners/years-multiple-winners.interface';
import { Observable } from 'rxjs';
import { IMovieData } from '../interfaces/list-movies.interface';
import { BaseApiService } from './base-api.service';

@Injectable()
export class MoviesService extends BaseApiService {
  getMovies(params?: { [key: string]: any }): Observable<IMovieData> {
    return this.get<IMovieData>('movies', params);
  }

  getYearsMultipleWinners() {
    return this.get<IYearsMultipleWinners>('movies', {
      projection: 'years-with-multiple-winners',
    });
  }
}
