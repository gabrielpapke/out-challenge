import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { IMovieData } from 'src/app/interfaces/list-movies.interface';
import { YesNoPipe } from 'src/app/pipes/yes-no.pipe';

@Component({
  selector: 'app-list-table',
  imports: [
    MatTableModule,
    YesNoPipe,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTableComponent {
  data = input.required<IMovieData | null>();
  loading = input.required<boolean>();

  onPageChange = output<number>();

  pageChange(event: PageEvent) {
    this.onPageChange.emit(event.pageIndex);
  }
}
