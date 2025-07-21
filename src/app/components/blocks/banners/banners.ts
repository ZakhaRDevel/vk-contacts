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
  textSpans2 = viewChildren<ElementRef>('textSpan2');
  bannerImages2 = viewChildren<ElementRef>('bannerImg2');
  underline2 = viewChild<ElementRef>('underline2');
  bannerOne = viewChild<ElementRef>('bannerOne');
  bannerTwo = viewChild<ElementRef>('bannerTwo');

  private secondBannerAnimated = false;

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
      .to(textOne, { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 })
      .to(
        textTwo,
        { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
        '-=0.7'
      )
      .to(
        textThree,
        { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
        '-=0.7'
      )
      .to(
        imgElements,
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        },
        '-=1.0'
      )
      .to(
        textFour,
        { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
        '-=0.7'
      )
      .to(line, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, '-=0.8');
  }

  private initSecondBannerAnimation() {
    const bannerTwo = this.bannerTwo()?.nativeElement;
    if (!bannerTwo) return;

    const textElements = this.textSpans2();
    const images = this.bannerImages2();
    const line = this.underline2()?.nativeElement;
    if (textElements.length === 0) return;

    const [textOne, textTwo, textThree, textFour, textFive, textSix] =
      textElements.map((ref) => ref.nativeElement);
    const imgElements = images.map((ref) => ref.nativeElement);

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    tl.set(textOne, { y: -10, clipPath: 'inset(0 0 100% 0)' })
      .set(textTwo, { y: -10, clipPath: 'inset(0 0 100% 0)' })
      .set(textThree, { y: -10, clipPath: 'inset(0 0 100% 0)' })
      .set(textFour, { y: -10, clipPath: 'inset(0 0 100% 0)' })
      .set(textFive, { y: -10, clipPath: 'inset(0 0 100% 0)' })
      .set(textSix, { y: -10, clipPath: 'inset(0 0 100% 0)' })
      .set(imgElements, { scale: 0, opacity: 0, rotation: -180 })
      .to(textOne, { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 })
      .to(
        textTwo,
        { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
        '-=0.7'
      )
      .to(
        imgElements[0],
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        '-=0.7'
      )
      .to(
        textThree,
        { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
        '-=0.7'
      )
      .to(
        textFour,
        { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
        '-=0.7'
      )
      .to(
        textFive,
        { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
        '-=0.7'
      )
      .to(
        textSix,
        { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
        '-=0.7'
      )
      .to(
        line,
        {
          scaleX: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.8'
      );
  }

  onEmblaChanged(event: EmblaEventType): void {
    if (event === 'select') {
      const api = this.emblaRef()?.emblaApi;
      if (api) {
        const currentIndex = api.selectedScrollSnap();
        this.selectedIndex.set(currentIndex);

        // Запускаем анимацию второго баннера только при первом переключении на него
        if (currentIndex === 1 && !this.secondBannerAnimated) {
          this.initSecondBannerAnimation();
          this.secondBannerAnimated = true;
        }
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
