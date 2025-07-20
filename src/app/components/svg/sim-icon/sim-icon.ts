import {Component, input} from '@angular/core';

@Component({
  selector: 'app-sim-icon',
  imports: [],
  templateUrl: './sim-icon.svg',
})
export class SimIcon {
  width = input<number>(26);
  height = input<number>(36);
}
