import {Component, inject} from '@angular/core';
import {CloseIcon} from '../../svg/close-icon/close-icon';
import {SwipeDownDirective} from '../../../directives/swipe-down.directive';
import {PlasticSimModalState} from '../../../services/plastic-sim-modal-state';

@Component({
  selector: 'app-plastic-sim-modal',
  imports: [CloseIcon, SwipeDownDirective],
  templateUrl: './plastic-sim-modal.html',
  standalone: true,
  styleUrl: './plastic-sim-modal.scss',
})
export class PlasticSimModal {
  protected readonly state = inject(PlasticSimModalState);
  isVisible = this.state.isVisible;

  close() {
    this.state.close();
  }

  onSwipeDown() {
    this.close();
  }
}
