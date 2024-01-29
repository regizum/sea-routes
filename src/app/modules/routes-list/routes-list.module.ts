import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';

import { RoutesListComponent } from './components/routes-list/routes-list.component';
import { RouteComponent } from './components/route/route.component';
import { RouteModalComponent } from './components/route-modal/route-modal.component';
import { WidgetComponent } from '@shared/components/widget/widget.component';

/**
 * This module is responsible for displaying the list of routes.
 */
@NgModule({
  declarations: [RoutesListComponent, RouteComponent, RouteModalComponent],
  imports: [
    CommonModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgChartsModule,
    WidgetComponent,
  ],
  providers: [DatePipe],
  exports: [RoutesListComponent],
})
export class RoutesListModule {}
