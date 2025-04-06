import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MoviesService } from '@services/movies.service';
import { CardComponent } from '@ui/card/card.component';
import { TableModule } from '@ui/table/table.component.module';
import { catchError, EMPTY, finalize, map, tap } from 'rxjs';

@Component({
  selector: 'app-years-multiple-winners',
  imports: [CommonModule, CardComponent, TableModule],
  templateUrl: './years-multiple-winners.component.html',
  styleUrl: './years-multiple-winners.component.scss',
})
export class YearsMultipleWinnersComponent {
  moviesService = inject(MoviesService);

  loading = signal(true);
  hasError = signal(false);

  data$ = this.moviesService
    .getYearsMultipleWinners()
    .pipe(
      tap(() => {
        this.loading.set(true);
        this.hasError.set(false);
      }),
      map((data) => {
        return data.years;
      })
    )
    .pipe(
      finalize(() => {
        this.loading.set(false);
      }),
      catchError(() => {
        this.hasError.set(true);
        return EMPTY;
      })
    );
}
