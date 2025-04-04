import {
  AfterContentInit,
  Component,
  computed,
  ContentChildren,
  input,
  QueryList,
  signal,
} from '@angular/core';
import { MatColumnDef } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterContentInit {
  @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;

  data = input.required<any>();
  columns = signal<string[]>([]);
  loading = input.required<boolean>();
  shimmerRows = input.required<number>();

  emptyRows = computed(() =>
    Array.from({ length: this.shimmerRows() }, (_, i) => i + 1)
  );

  ngAfterContentInit() {
    const columns = this.columnDefs.map((item) => item.name);
    this.columns.set(columns);
  }
}
