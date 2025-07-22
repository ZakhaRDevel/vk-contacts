import {
  Component,
  inject,
  AfterViewInit,
  ElementRef,
  viewChildren,
  viewChild,
  OnDestroy,
} from '@angular/core';
import {Container} from '../container/container';
import {NgOptimizedImage} from '@angular/common';
import {Button} from '../../ui/button/button';
import {ModalService} from '../../../services/modal';
import {SimModal} from '../../modal/sim-modal/sim-modal';
import {gsap} from 'gsap';

@Component({
  selector: 'app-intro',
  imports: [Container, NgOptimizedImage, Button],
  templateUrl: './intro.html',
  styleUrl: './intro.scss',
})
export class Intro implements AfterViewInit, OnDestroy {
  images = viewChildren<ElementRef>('img');
  texts = viewChildren<ElementRef>('text');
  btn = viewChild<ElementRef>('btn');
  modal = inject(ModalService);
  private elementRef = inject(ElementRef);

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.initAnimation();
    // }, 100);
  }

  ngOnDestroy() {
    // const textElements = this.texts();
    // const animImgs = this.images();
    // const btn = this.btn()?.nativeElement;
    //
    // textElements.forEach((ref) => {
    //   gsap.killTweensOf(ref.nativeElement);
    // });
    // animImgs.forEach((ref) => {
    //   gsap.killTweensOf(ref.nativeElement);
    // });
    // if (btn) {
    //   gsap.killTweensOf(btn);
    // }
  }

  private initAnimation() {
    const tl = gsap.timeline({
      defaults: {ease: 'power3.out'},
      id: 'intro-animation',
    });

    const textElements = this.texts();
    const animImgs = this.images();
    const btn = this.btn()?.nativeElement;

    if (textElements.length === 0 || animImgs.length === 0) {
      return;
    }

    const [one, two, three] = textElements.map((ref) => ref.nativeElement);
    const imgElements = animImgs.map((ref) => ref.nativeElement);

    tl.set(one, {y: -10, clipPath: 'inset(0 0 100% 0)'})
      .set(two, {y: -10, clipPath: 'inset(0 0 100% 0)'})
      .set(three, {y: -10, clipPath: 'inset(0 0 100% 0)'})
      .set(imgElements, {scale: 0, opacity: 0, rotation: -180})
      .set(btn, {opacity: 0})
      .to(one, {y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.5})
      .to(two, {y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.5}, '-=1.0')
      .to(
        imgElements,
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
        },
        '-=1.5'
      )
      .to(three, {y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.5}, '-=1.0')
      .to(btn, {opacity: 1, duration: 0.8}, '-=1.0');
  }

  onOpenModal() {
    this.modal.open(SimModal, {data: {title: 'Выбери тип сим-карты'}});
  }
}
