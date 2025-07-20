import {Component, input} from '@angular/core';

@Component({
  selector: 'app-esim-icon',
  imports: [],
  templateUrl: './esim-icon.svg',
})
export class EsimIcon {
  width = input<number>(26);
  height = input<number>(36);
}
