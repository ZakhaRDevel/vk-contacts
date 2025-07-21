import {
  Component,
  inject,
  signal,
  viewChild,
  AfterViewInit,
  ElementRef,
  viewChildren,
} from '@angular/core';
import {
  EmblaCarouselDirective,
  EmblaEventType,
  EmblaOptionsType,
} from 'embla-carousel-angular';
import { NgOptimizedImage } from '@angular/common';
import { Button } from '../../ui/button/button';
import { ModalService } from '../../../services/modal';
import { SimModal } from '../../modal/sim-modal/sim-modal';
import { gsap } from 'gsap';

@Component({
  selector: 'app-banners',
  imports: [EmblaCarouselDirective, NgOptimizedImage, Button],
  templateUrl: './banners.html',
  styleUrl: './banners.scss',
})
export class Banners implements AfterViewInit {
  private emblaRef = viewChild<EmblaCarouselDirective>(EmblaCarouselDirective);

  textSpans = viewChildren<ElementRef>('textSpan');
  bannerImages = viewChildren<ElementRef>('bannerImg');
  underline = viewChild<ElementRef>('underline');
  bannerOne = viewChild<ElementRef>('bannerOne');

  protected cardsOptions: EmblaOptionsType = {
    align: 'start',
  };
  protected selectedIndex = signal(0);
  modal = inject(ModalService);

  ngAfterViewInit() {
    this.initAnimation();
  }

  private initAnimation() {
    const bannerOne = this.bannerOne()?.nativeElement;
    if (!bannerOne) return;

    const textElements = this.textSpans();
    const images = this.bannerImages();
    const line = this.underline()?.nativeElement;

    if (textElements.length === 0) return;

    const [textOne, textTwo, textThree, textFour] = textElements.map(
      (ref) => ref.nativeElement
    );
    const imgElements = images.map((ref) => ref.nativeElement);

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: bannerOne,
        start: 'center 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.set(textOne, { y: -10, clipPath: 'inset(0 0 100% 0)' })
      .set(textTwo, { y: -10, clipPath: 'inset(0 0 100% 0)' })
      .set(textThree, { y: -10, clipPath: 'inset(0 0 100% 0)' })
      .set(textFour, { y: -10, clipPath: 'inset(0 0 100% 0)' })
      .set(imgElements, { scale: 0, opacity: 0, rotation: -180 })
      .set(line, { scaleX: 0, transformOrigin: 'left center' })
      .to(textOne, { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.5 })
      .to(
        textTwo,
        { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.5 },
        '-=1.0'
      )
      .to(
        textThree,
        { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.5 },
        '-=1.0'
      )
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
      .to(
        textFour,
        { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.5 },
        '-=1.0'
      )
      .to(line, { scaleX: 1, duration: 0.8, ease: 'power2.out' }, '-=1.0');
  }

  onEmblaChanged(event: EmblaEventType): void {
    if (event === 'select') {
      const api = this.emblaRef()?.emblaApi;
      if (api) {
        this.selectedIndex.set(api.selectedScrollSnap());
      }
    }
  }

  protected scrollTo(index: number): void {
    this.emblaRef()?.emblaApi?.scrollTo(index);
  }

  onOpenModal() {
    this.modal.open(SimModal, { data: { title: 'Выбери тип сим-карты' } });
  }
}
