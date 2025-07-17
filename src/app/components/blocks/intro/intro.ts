import { Component } from '@angular/core';
import {Container} from '../container/container';
import {NgOptimizedImage} from '@angular/common';
import {Button} from '../../ui/button/button';

@Component({
  selector: 'app-intro',
  imports: [
    Container,
    NgOptimizedImage,
    Button
  ],
  templateUrl: './intro.html',
  styleUrl: './intro.scss'
})
export class Intro {

}
