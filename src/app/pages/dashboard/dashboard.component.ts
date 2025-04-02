import { Component } from '@angular/core';
import { MovieWinnersByYearComponent } from './components/movie-winners-by-year/movie-winners-by-year.component';
import { ProducersIntervalComponent } from './components/producers-interval/producers-interval.component';
import { TopWinnersComponent } from './components/top-winners/top-winners.component';
import { YearsMultipleWinnersComponent } from './components/years-multiple-winners/years-multiple-winners.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MovieWinnersByYearComponent,
    TopWinnersComponent,
    ProducersIntervalComponent,
    YearsMultipleWinnersComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
