import {Component, inject} from '@angular/core';
import {Modal} from '../modal';
import {ModalService} from '../../../services/modal';
import {PlasticSimModalState} from '../../../services/plastic-sim-modal-state';
import {SimIcon} from '../../svg/sim-icon/sim-icon';
import {Arrow} from '../../svg/arrow/arrow';
import {EsimIcon} from '../../svg/esim-icon/esim-icon';

@Component({
  selector: 'app-sim-modal',
  imports: [Modal, SimIcon, Arrow, EsimIcon],
  templateUrl: './sim-modal.html',
  styleUrl: './sim-modal.scss',
  standalone: true,
})
export class SimModal {
  private readonly plasticSimModalState = inject(PlasticSimModalState);
  protected modalService = inject(ModalService)

  onPlasticClick(): void {
    this.plasticSimModalState.open();
  }

  close() {
      this.modalService.close();
  }
}
