import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { IRoute } from '@shared/types/routes';
import { RouteModalComponent } from '../route-modal/route-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * This component is used to display a single route in the list of routes.
 *
 * Usage example:
 * <a href="#" route [route]="routeData" (onDelete)="delete($event)"></routes-list-item>
 */
@Component({
  selector: '[route]',
  templateUrl: './route.component.html',
})
export class RouteComponent {
  @Input('routeData') route: IRoute;
  @Output() onDelete: EventEmitter<IRoute> = new EventEmitter<IRoute>();

  private modalService = inject(NgbModal);

  // Open modal window with route details and chart
  openModal() {
    const modalRef = this.modalService.open(RouteModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.route = this.route;
  }
}
