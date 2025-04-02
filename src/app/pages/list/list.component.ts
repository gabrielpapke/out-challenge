import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CardComponent } from '@components/card/card.component';
import { IMovie } from 'src/app/interfaces/movie.interface';
import { moviesMock } from 'src/mocks/movies.mock';
import { ListTableComponent } from './table/table.component';

@Component({
  selector: 'app-list',
  imports: [CardComponent, MatPaginatorModule, ListTableComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  dataSource: IMovie[] = moviesMock;
}
