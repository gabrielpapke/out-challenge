import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CardComponent } from '@ui/card/card.component';
import { IStudioTopWinnerItem } from './top-winners.interface';

@Component({
  selector: 'app-top-winners',
  imports: [CardComponent, MatTableModule],
  templateUrl: './top-winners.component.html',
  styleUrl: './top-winners.component.scss',
})
export class TopWinnersComponent {
  dataSource: IStudioTopWinnerItem[] = [
    {
      name: 'Studio Name',
      winCount: 9,
    },
    {
      name: 'Studio Name',
      winCount: 9,
    },
  ];
}
