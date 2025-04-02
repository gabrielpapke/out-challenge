import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { IMovie } from 'src/app/interfaces/movie.interface';
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
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTableComponent {
  data = input.required<IMovie[]>();
}
