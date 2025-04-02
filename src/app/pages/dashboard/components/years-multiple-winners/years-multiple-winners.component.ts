import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CardComponent } from '../../../../components/card/card.component';
import { IYearsMultipleWinnersItem } from './years-multiple-winners.interface';

@Component({
  selector: 'app-years-multiple-winners',
  imports: [CardComponent, MatTableModule],
  templateUrl: './years-multiple-winners.component.html',
  styleUrl: './years-multiple-winners.component.scss',
})
export class YearsMultipleWinnersComponent {
  dataSource: IYearsMultipleWinnersItem[] = [
    {
      year: 1994,
      winnerCount: 3,
    },
    {
      year: 2005,
      winnerCount: 10,
    },
    {
      year: 2024,
      winnerCount: 15,
    },
  ];
}
