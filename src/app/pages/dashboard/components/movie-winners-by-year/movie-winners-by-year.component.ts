import { Component } from '@angular/core';
import { IMovie } from 'src/app/interfaces/movie.interface';
import { moviesMock } from 'src/mocks/movies.mock';
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
  data: IMovie[] = moviesMock;
}
