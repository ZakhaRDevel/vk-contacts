import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Container} from '../container/container';

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage,
    Container
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
