import {Component, input} from '@angular/core';

@Component({
  selector: 'app-close-icon',
  imports: [],
  templateUrl: './close-icon.svg',
})
export class CloseIcon {
  width = input<number>(24);
  height = input<number>(24);
}
