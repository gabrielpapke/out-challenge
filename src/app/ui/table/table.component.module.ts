import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SpinnerComponent } from '@ui/spinner/spinner.component';
import { StateComponent } from '@ui/state/state.component';
import { ShimmerComponent } from '../shimmer/shimmer.component';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    ShimmerComponent,
    SpinnerComponent,
    StateComponent,
  ],
  exports: [TableComponent, MatTableModule],
})
export class TableModule {}
