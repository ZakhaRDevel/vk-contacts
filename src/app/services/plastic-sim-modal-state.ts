import {inject, Injectable, signal} from '@angular/core';
import {ModalService} from './modal';

@Injectable({providedIn: 'root'})
export class PlasticSimModalState {
  readonly isVisible = signal(false);
  readonly isClosing = signal(false);
  private readonly modalService = inject(ModalService);

  open() {
    this.modalService.close()
    this.isVisible.set(true);
    setTimeout(() => {
      this.modalService.lockScroll()
    }, 400)

  }

  close() {
    this.isVisible.set(false);
    this.isClosing.set(true);
    setTimeout(() => {
      this.isClosing.set(false);
      this.modalService.unlockScroll()
    }, 300);
  }
}
