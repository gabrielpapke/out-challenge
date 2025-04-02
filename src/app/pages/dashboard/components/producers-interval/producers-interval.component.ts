import { Component } from '@angular/core';
import { producersIntervalMock } from 'src/mocks/producers-interval.mock';
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
  dataSource: IProducersInterval = producersIntervalMock;
}
