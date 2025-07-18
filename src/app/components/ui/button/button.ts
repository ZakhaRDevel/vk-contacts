import {Component, input, output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [
    NgClass
  ],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  btnClick = output()
  variant = input<'primary' | 'secondary'>('primary')
  isFull = input<boolean>(true)
}
