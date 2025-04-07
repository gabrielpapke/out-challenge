import { Component, output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTable } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { ShimmerComponent } from '@ui/shimmer/shimmer.component';
import { SpinnerComponent } from '@ui/spinner/spinner.component';
import { StateComponent } from '@ui/state/state.component';
import { TableComponent } from './table.component';
import { TableModule } from './table.component.module';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  let hostFixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostComponent);
    hostComponent = hostFixture.componentInstance;
  });

  it('should create', () => {
    hostFixture.detectChanges();

    expect(hostComponent).toBeTruthy();
  });

  it('should display error state when there is an error and call retry', () => {
    const spyRetry = spyOn(hostComponent.onRetryEmitter, 'emit');
    hostComponent.hasError = true;
    hostFixture.detectChanges();

    const errorState = hostFixture.debugElement.query(
      By.directive(StateComponent)
    );
    errorState.triggerEventHandler('onRetry', undefined);

    expect(spyRetry).toHaveBeenCalled();
    expect(errorState).toBeTruthy();
    expect(errorState.componentInstance.type()).toEqual('error');
  });

  it('should show spinner on first loading', () => {
    hostComponent.data = null;
    hostComponent.loading = true;
    hostFixture.detectChanges();

    const spinnerComponent = hostFixture.debugElement.query(
      By.directive(SpinnerComponent)
    );
    expect(spinnerComponent).toBeTruthy();
  });

  it('should display shimmer when loading data', () => {
    hostComponent.loading = true;
    hostFixture.detectChanges();

    const table = hostFixture.debugElement.query(By.directive(MatTable));
    const shimmer = hostFixture.debugElement.query(
      By.directive(ShimmerComponent)
    );
    const dataRows = table.queryAll(By.css('tbody tr'));
    expect(table).toBeTruthy();
    expect(dataRows.length).toEqual(hostComponent.data!.length);
    expect(shimmer).toBeTruthy();
  });

  it('should display shimmer defined by shimmer rows input when loading data', () => {
    const expectedShimmerRows = 20;
    hostComponent.shimmerRows = expectedShimmerRows;
    hostComponent.loading = true;
    hostComponent.data = [];
    hostFixture.detectChanges();

    const table = hostFixture.debugElement.query(By.directive(MatTable));
    const shimmer = hostFixture.debugElement.query(
      By.directive(ShimmerComponent)
    );
    const dataRows = table.queryAll(By.css('tbody tr'));

    expect(table).toBeTruthy();
    expect(shimmer).toBeTruthy();
    expect(dataRows.length).toEqual(expectedShimmerRows);
  });

  it('should display table when data is loaded without errors', () => {
    hostComponent.loading = false;
    hostFixture.detectChanges();

    const table = hostFixture.debugElement.query(By.directive(MatTable));
    const dataRows = table.queryAll(By.css('tbody tr'));

    expect(table).toBeTruthy();
    expect(dataRows.length).toEqual(hostComponent.data!.length);
  });

  it('should display empty state when no data is available', () => {
    hostComponent.loading = false;
    hostComponent.data = [];
    hostFixture.detectChanges();

    const emptyState = hostFixture.debugElement.query(
      By.directive(StateComponent)
    );

    debugger;

    expect(emptyState.componentInstance.type()).toEqual('info');
    expect(emptyState).toBeTruthy();
  });
});

@Component({
  template: `
    <app-table
      [data]="data"
      [loading]="loading"
      [shimmerRows]="shimmerRows"
      (onRetry)="onRetry()"
      [hasError]="hasError"
    >
      <ng-container matColumnDef="id">
        <span mat-header-cell *matHeaderCellDef>ID</span>
        <span mat-cell *matCellDef="let element">{{ element.id }}</span>
      </ng-container>

      <ng-container matColumnDef="title">
        <span mat-header-cell *matHeaderCellDef>Title</span>
        <span mat-cell *matCellDef="let element">{{ element.title }}</span>
      </ng-container>
    </app-table>
  `,
  imports: [TableModule],
})
class HostComponent {
  loading = false;
  hasError = false;
  shimmerRows = 15;

  onRetryEmitter = output<void>();

  data:
    | {
        id: number;
        title: string;
      }[]
    | null = [
    {
      id: 1,
      title: 'Title 1',
    },
    {
      id: 2,
      title: 'Title 2',
    },
  ];

  onRetry() {
    this.onRetryEmitter.emit();
  }
}
