import { Component, input } from '@angular/core';
import { TableModule } from '../../../../../ui/table/table.component.module';
import { IProducerIntervalItem } from '../producers-interval.interface';

@Component({
  selector: 'app-producers-interval-table',
  imports: [TableModule],
  templateUrl: './producers-interval-table.component.html',
  styleUrl: './producers-interval-table.component.scss',
})
export class ProducersIntervalTableComponent {
  title = input.required<string>();
  data = input.required<IProducerIntervalItem[] | undefined>();
  loading = input.required<boolean>();
  hasError = input.required<boolean>();
}
