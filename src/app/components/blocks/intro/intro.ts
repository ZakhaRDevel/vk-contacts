import {Component, inject} from '@angular/core';
import {Container} from '../container/container';
import {NgOptimizedImage} from '@angular/common';
import {Button} from '../../ui/button/button';
import {ModalService} from '../../../services/modal';
import {SimModal} from '../../modal/sim-modal/sim-modal';

@Component({
  selector: 'app-intro',
  imports: [Container, NgOptimizedImage, Button],
  templateUrl: './intro.html',
  styleUrl: './intro.scss',
})
export class Intro {
  modal = inject(ModalService);

  onOpenModal() {
    this.modal.open(SimModal, {data: {title: 'Выбери тип сим-карты'}});
  }
}
