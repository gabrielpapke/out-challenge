import { Component, input } from '@angular/core';
import { TableModule } from '@ui/table/table.component.module';
import { IMovie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-movie-winners-by-year-table',
  imports: [TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class MovieWinnersByYearTableComponent {
  data = input.required<IMovie[] | undefined>();
  loading = input.required<boolean>();
  hasError = input.required<boolean>();
}
