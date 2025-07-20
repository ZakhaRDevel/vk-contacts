import {Component, input} from '@angular/core';

@Component({
  selector: 'app-arrow',
  imports: [],
  templateUrl: './arrow.svg',
})
export class Arrow {
  width = input<number>(24);
  height = input<number>(24);
}
