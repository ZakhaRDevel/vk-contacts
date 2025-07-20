import { Component } from '@angular/core';
import {AccordionComponent} from '../../ui/accordion/accordion';
import {Container} from '../container/container';

@Component({
  selector: 'app-faq',
  imports: [
    AccordionComponent,
    Container
  ],
  templateUrl: './faq.html',
  styleUrl: './faq.scss'
})
export class Faq {

}
