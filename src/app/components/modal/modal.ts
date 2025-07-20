import {Component, Inject, Optional, signal, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalService} from '../../services/modal';
import {SwipeDownDirective} from '../../directives/swipe-down.directive';
import {CloseIcon} from '../svg/close-icon/close-icon';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, SwipeDownDirective, CloseIcon],
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
})
export class Modal {
  constructor(
    @Optional() @Inject('MODAL_DATA') public data: any,
    protected modalService: ModalService
  ) {
  }

  close(): void {
    this.modalService.close()
  }

  onSwipeDown(): void {
    this.close();
  }
}
