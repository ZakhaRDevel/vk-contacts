import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { Header } from './components/blocks/header/header';
import { Footer } from './components/blocks/footer/footer';
import { Intro } from './components/blocks/intro/intro';
import { Cards } from './components/blocks/cards/cards';
import { Banners } from './components/blocks/banners/banners';
import { Faq } from './components/blocks/faq/faq';
import { Steps } from './components/blocks/steps/steps';
import { FixedBtn } from './components/blocks/fixed-btn/fixed-btn';
import { IsBrowser } from './services/is-browser';
import { Cookie } from './components/blocks/cookie/cookie';
import {PlasticSimModal} from './components/modal/plastic-sim-modal/plastic-sim-modal';

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
    Faq,
    Steps,
    FixedBtn,
    Cookie,
  ],
  standalone: true
})
export class App implements AfterViewInit, OnDestroy {
  private IsBrowser = inject(IsBrowser);
  private observer?: IntersectionObserver;

  visible = signal(false);
  steps = viewChild('steps', { read: ElementRef });

  ngAfterViewInit() {
    if (!this.IsBrowser.isBrowser) return;
    const steps = this.steps()?.nativeElement;
    if (!steps) return;
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.visible.set(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    this.observer.observe(steps);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
