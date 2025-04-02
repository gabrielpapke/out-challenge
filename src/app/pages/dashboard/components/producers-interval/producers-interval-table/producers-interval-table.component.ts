import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { IProducerIntervalItem } from '../producers-interval.interface';

@Component({
  selector: 'app-producers-interval-table',
  imports: [MatTableModule],
  templateUrl: './producers-interval-table.component.html',
  styleUrl: './producers-interval-table.component.scss',
})
export class ProducersIntervalTableComponent {
  title = input.required<string>();
  dataSource = input.required<IProducerIntervalItem[]>();
}
