import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-state',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss',
})
export class StateComponent {
  type = input.required<'info' | 'error'>();
  title = input.required<string>();

  onRetry = output<void>();

  icon = computed(() =>
    this.type() === 'error' ? 'error' : 'check_box_outline_blank'
  );
}
