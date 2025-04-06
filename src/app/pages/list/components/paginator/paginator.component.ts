import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { IMovieData } from 'src/app/interfaces/list-movies.interface';

@Component({
  selector: 'app-paginator',
  imports: [MatPaginatorModule, CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  data = input.required<IMovieData | null>();
  currentPage = input.required<number>();
  defaultPageLength = input.required<number>();
  loading = input.required<boolean>();

  onPageChange = output<number>();

  pageChange(event: PageEvent) {
    this.onPageChange.emit(event.pageIndex);
  }
}
