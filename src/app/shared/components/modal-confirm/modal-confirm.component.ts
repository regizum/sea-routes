import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * This component is responsible for displaying the modal window to confirm an action.
 *
 * Usage example:
 * const modalRef = this.modalService.open(ModalConfirm);
 * modalRef.componentInstance.title = 'Records deletion';
 * modalRef.componentInstance.subtitle = `Are you sure you want to delete <span class="text-primary">all data</span>?`;
 * modalRef.componentInstance.description =
 *    'All information will be permanently deleted.';
 * modalRef.result.then(
 *   () => {
 *      callbackOnSuccess();
 *   },
 *   () => {}
 * );
 */
@Component({
  selector: 'modal-confirm',
  standalone: true,
  templateUrl: './modal-confirm.component.html',
})
export class ModalConfirm {
  @Input() public title: string;
  @Input() public subtitle: string;
  @Input() public description: string;
  modal = inject(NgbActiveModal);
}
