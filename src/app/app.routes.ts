import { Routes } from '@angular/router';

import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { ListComponent } from '@pages/list/list.component';

export const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: '**', component: DashboardComponent },
];
