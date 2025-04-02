import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { IMovie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-movie-winners-by-year-table',
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class MovieWinnersByYearTableComponent {
  data = input.required<IMovie[]>();
}
