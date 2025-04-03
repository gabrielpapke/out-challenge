import { Injectable } from '@angular/core';
import { movieDataMock } from '@mocks/movies-data.mock';
import { delay, Observable, of } from 'rxjs';
import { IMovieData } from '../interfaces/list-movies.interface';
import { BaseApiService } from './base-api.service';

@Injectable()
export class MoviesService extends BaseApiService {
  getMovies(params?: { [key: string]: any }): Observable<IMovieData> {
    // return this.baseApi.get<IMovieData>('movies/', params);
    return of(movieDataMock).pipe(delay(2000));
  }
}
