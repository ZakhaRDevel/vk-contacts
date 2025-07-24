import {Component, input, output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [
    NgClass
  ],
  templateUrl: './button.html',
  standalone: true,
  styleUrl: './button.scss'
})
export class Button {
  btnClick = output()
  variant = input<'primary' | 'secondary'>('primary')
  size = input<'medium' | 'large'>('medium')
  isFull = input<boolean>(true)
}
