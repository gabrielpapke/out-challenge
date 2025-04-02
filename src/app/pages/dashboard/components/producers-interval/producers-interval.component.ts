import { Component } from '@angular/core';
import { CardComponent } from '../../../../components/card/card.component';
import { ProducersIntervalTableComponent } from './producers-interval-table/producers-interval-table.component';
import { IProducersInterval } from './producers-interval.interface';

@Component({
  selector: 'app-producers-interval',
  imports: [CardComponent, ProducersIntervalTableComponent],
  templateUrl: './producers-interval.component.html',
  styleUrl: './producers-interval.component.scss',
})
export class ProducersIntervalComponent {
  dataSource: IProducersInterval = {
    min: [
      {
        producer: 'Producer Name',
        interval: 9,
        previousWin: 2018,
        followingWin: 2019,
      },
    ],
    max: [
      {
        producer: 'Producer Name',
        interval: 99,
        previousWin: 1900,
        followingWin: 1999,
      },
    ],
  };
}
