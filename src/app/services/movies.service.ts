import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovieData } from '../interfaces/list-movies.interface';
import { BaseApiService } from './base-api.service';

@Injectable()
export class MoviesService extends BaseApiService {
  getMovies(params?: { [key: string]: any }): Observable<IMovieData> {
    return this.get<IMovieData>('movies', params);
  }
}
