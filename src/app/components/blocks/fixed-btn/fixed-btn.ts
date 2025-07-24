import {
  Component,
  signal,
  effect,
  inject,
  ElementRef,
  AfterViewInit,
  OnDestroy, input,
} from '@angular/core';
import {Button} from '../../ui/button/button';
import {SimModal} from '../../modal/sim-modal/sim-modal';
import {ModalService} from '../../../services/modal';

@Component({
  selector: 'app-fixed-btn',
  imports: [Button],
  templateUrl: './fixed-btn.html',
  styleUrl: './fixed-btn.scss',
  standalone: true
})
export class FixedBtn {
  visible = input(false);
  modal = inject(ModalService);

  onOpenModal() {
    this.modal.open(SimModal, {data: {title: 'Выбери тип сим-карты'}});
  }
}
