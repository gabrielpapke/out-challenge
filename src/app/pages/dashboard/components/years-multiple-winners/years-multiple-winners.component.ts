import { Component } from '@angular/core';
import { CardComponent } from '@ui/card/card.component';
import { TableModule } from '@ui/table/table.component.module';
import { IYearsMultipleWinnersItem } from './years-multiple-winners.interface';

@Component({
  selector: 'app-years-multiple-winners',
  imports: [CardComponent, TableModule],
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
