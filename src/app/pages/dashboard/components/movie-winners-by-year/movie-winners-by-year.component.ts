import { Component } from '@angular/core';
import { CardComponent } from '../../../../components/card/card.component';

@Component({
  selector: 'app-movie-winners-by-year',
  imports: [CardComponent],
  templateUrl: './movie-winners-by-year.component.html',
  styleUrl: './movie-winners-by-year.component.scss',
})
export class MovieWinnersByYearComponent {}
