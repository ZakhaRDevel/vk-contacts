import {Component, input} from '@angular/core';

@Component({
  selector: 'app-telegram-icon',
  imports: [],
  templateUrl: './telegram-icon.svg',
})
export class TelegramIcon {
  width = input<number>(32);
  height = input<number>(32);
}
