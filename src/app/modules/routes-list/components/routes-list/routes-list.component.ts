import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRoute } from '@shared/types/routes';
import { ModalConfirm } from '@shared/components/modal-confirm/modal-confirm.component';

/**
 * This component is used to display a list of routes.
 * It also allows to select a route and delete it.
 *
 * Usage example:
 * <routes-list [routesList]="routesList" (onSelectRoute)="selectRoute($event)"></routes-list>
 */
@Component({
  selector: 'routes-list',
  templateUrl: './routes-list.component.html',
})
export class RoutesListComponent {
  @Input() routesList: Array<IRoute>;
  @Output() onSelectRoute: EventEmitter<IRoute> = new EventEmitter<IRoute>();
  chosenRouteId: number;
  private modalService = inject(NgbModal);

  // This method is used to open a confirmation modal to delete a route.
  openConfirmationModal(route: IRoute, callbackOnSuccess: () => void) {
    const modalRef = this.modalService.open(ModalConfirm);
    modalRef.componentInstance.title = 'Record deletion';
    modalRef.componentInstance.subtitle = `Are you sure you want to delete <span class="text-primary">record&nbsp;#${route.route_id}
      <span class="text-nowrap">(${route.from_port}&nbsp;<i class="fa-solid fa-arrow-right"></i>&nbsp;${route.to_port})</span></span>?`;
    modalRef.componentInstance.description =
      'All information associated to this record will be permanently deleted.';
    modalRef.result.then(
      () => {
        callbackOnSuccess();
      },
      () => {},
    );
  }

  selectRoute(route: IRoute) {
    this.chosenRouteId = route.route_id;
    this.onSelectRoute.emit(route);
  }

  deleteRoute(route: IRoute) {
    this.openConfirmationModal(route, () => {
      this.routesList = this.routesList.filter((item) => item !== route);
    });
  }
}
