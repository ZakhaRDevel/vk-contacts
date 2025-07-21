import {Component, OnInit} from '@angular/core';
import {Header} from './components/blocks/header/header';
import {Footer} from './components/blocks/footer/footer';
import {Intro} from './components/blocks/intro/intro';
import {Cards} from './components/blocks/cards/cards';
import {Banners} from './components/blocks/banners/banners';
import {Container} from './components/blocks/container/container';
import {NgOptimizedImage} from '@angular/common';
import {Faq} from './components/blocks/faq/faq';
import {Steps} from './components/blocks/steps/steps';

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
    Container,
    NgOptimizedImage,
    Faq,
    Steps,
  ],
})
export class App {

}
