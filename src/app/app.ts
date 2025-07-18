import {Component} from '@angular/core';
import {Header} from './components/blocks/header/header';
import {Footer} from './components/blocks/footer/footer';
import {Intro} from './components/blocks/intro/intro';
import {Cards} from './components/blocks/cards/cards';
import {Banners} from './components/blocks/banners/banners';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    Header,
    Footer,
    Intro,
    Cards,
    Banners,
  ],
})
export class App {

}
