import { Component, inject } from '@angular/core';
import { Modal } from '../modal';
import { ModalService } from '../../../services/modal';
import { PlasticSimModal } from '../plastic-sim-modal/plastic-sim-modal';
import {SimIcon} from '../../svg/sim-icon/sim-icon';
import {Arrow} from '../../svg/arrow/arrow';
import {EsimIcon} from '../../svg/esim-icon/esim-icon';

@Component({
  selector: 'app-sim-modal',
  imports: [Modal, SimIcon, Arrow, EsimIcon],
  templateUrl: './sim-modal.html',
  styleUrl: './sim-modal.scss',
})
export class SimModal {
  private modalService = inject(ModalService);

  onPlasticClick(): void {
    this.modalService.open(PlasticSimModal);
  }
}
