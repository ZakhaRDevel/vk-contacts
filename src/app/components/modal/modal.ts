import {
  Component,
  Inject,
  Optional,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalService} from '../../services/modal';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
})
export class Modal {
  constructor(
    @Optional() @Inject('MODAL_DATA') public data: any,
    private modalService: ModalService
  ) {
  }

  close(): void {
    this.modalService.close();
  }
}
