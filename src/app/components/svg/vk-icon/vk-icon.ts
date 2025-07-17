import {Component, input} from '@angular/core';

@Component({
  selector: 'app-vk-icon',
  imports: [],
  templateUrl: './vk-icon.svg',
})
export class VkIcon {
  width = input<number>(32);
  height = input<number>(32);
}
