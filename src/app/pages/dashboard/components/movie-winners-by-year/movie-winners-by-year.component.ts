import { Component } from '@angular/core';
import { IMovie } from 'src/app/interfaces/movie.interface';
import { CardComponent } from '../../../../components/card/card.component';
import { MovieWinnersByYearSearchFormComponent } from './search-form/search-form.component';
import { MovieWinnersByYearTableComponent } from './table/table.component';

@Component({
  selector: 'app-movie-winners-by-year',
  imports: [
    CardComponent,
    MovieWinnersByYearSearchFormComponent,
    MovieWinnersByYearTableComponent,
  ],
  templateUrl: './movie-winners-by-year.component.html',
  styleUrl: './movie-winners-by-year.component.scss',
})
export class MovieWinnersByYearComponent {
  data: IMovie[] = [
    {
      id: 99,
      year: 1990,
      title: 'Movie Title',
      studios: ['Studio Name'],
      producers: [' Producer Name '],
      winner: true,
    },
    {
      id: 100,
      year: 1990,
      title: 'Movie Title 2',
      studios: ['Studio Name'],
      producers: [' Producer Name '],
      winner: true,
    },
    {
      id: 101,
      year: 1990,
      title: 'Movie Title 3',
      studios: ['Studio Name'],
      producers: [' Producer Name '],
      winner: true,
    },
    {
      id: 101,
      year: 1990,
      title: 'Movie Title 3',
      studios: ['Studio Name'],
      producers: [' Producer Name '],
      winner: true,
    },
    {
      id: 101,
      year: 1990,
      title: 'Movie Title 3',
      studios: ['Studio Name'],
      producers: [' Producer Name '],
      winner: true,
    },
    {
      id: 101,
      year: 1990,
      title: 'Movie Title 3',
      studios: ['Studio Name'],
      producers: [' Producer Name '],
      winner: true,
    },
    {
      id: 101,
      year: 1990,
      title: 'Movie Title 3',
      studios: ['Studio Name'],
      producers: [' Producer Name '],
      winner: true,
    },
    {
      id: 101,
      year: 1990,
      title: 'Movie Title 3',
      studios: ['Studio Name'],
      producers: [' Producer Name '],
      winner: true,
    },
  ];
}
