import { Component, inject } from '@angular/core';
import { IRoute } from '@shared/types/routes';
import { ModalConfirm } from '@shared/components/modal-confirm/modal-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * This component is container for the whole application.
 * It is used to combine all the components and modules together.
 * It also contains the logic to delete all the data.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  loading: boolean = false;
  routes: IRoute[] = [];
  selectedRoute: IRoute | null;
  private modalService = inject(NgbModal);

  constructor() {}

  onDataImport(routes: IRoute[]) {
    this.routes = routes;
  }

  onLoadStart() {
    this.loading = true;
  }

  onLoadEnd() {
    this.loading = false;
  }

  onSelectRoute(route: IRoute) {
    this.selectedRoute = route;
  }

  openConfirmationModal(callbackOnSuccess: () => void) {
    const modalRef = this.modalService.open(ModalConfirm);
    modalRef.componentInstance.title = 'Records deletion';
    modalRef.componentInstance.subtitle = `Are you sure you want to delete <span class="text-primary">all data</span>?`;
    modalRef.componentInstance.description =
      'All information will be permanently deleted.';
    modalRef.result.then(
      () => {
        callbackOnSuccess();
      },
      () => {},
    );
  }

  deleteAllData() {
    this.openConfirmationModal(() => {
      this.routes = [];
      this.selectedRoute = null;
    });
  }
}
