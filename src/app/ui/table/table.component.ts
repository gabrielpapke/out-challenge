import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChildren,
  input,
  output,
  QueryList,
  signal,
} from '@angular/core';
import { MatColumnDef } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterContentInit {
  @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;

  data = input.required<any>();
  columns = signal<string[]>([]);
  loading = input.required<boolean>();
  shimmerRows = input.required<number>();
  hasError = input<boolean>();
  stickyHeader = input<boolean>(false);

  onRetry = output<void>();

  currentShimmerRows = computed(() => {
    return (this.data()?.length ?? 0) > 0
      ? this.data()?.length!
      : this.shimmerRows();
  });

  emptyRows = computed(() =>
    Array.from({ length: this.currentShimmerRows() }, (_, i) => i + 1)
  );

  firstLoading = computed(() => this.loading() && this.data() === null);

  ngAfterContentInit() {
    const columns = this.columnDefs.map((item) => item.name);
    this.columns.set(columns);
  }
}
