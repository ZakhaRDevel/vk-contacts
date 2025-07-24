import {
  Component,
  inject,
  signal,
  viewChild,
  AfterViewInit,
  ElementRef,
  viewChildren,
  OnDestroy,
} from '@angular/core';
import {
  EmblaCarouselDirective,
  EmblaEventType,
  EmblaOptionsType,
} from 'embla-carousel-angular';
import {NgOptimizedImage} from '@angular/common';
import {Button} from '../../ui/button/button';
import {ModalService} from '../../../services/modal';
import {SimModal} from '../../modal/sim-modal/sim-modal';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {IsBrowser} from '../../../services/is-browser';

@Component({
  selector: 'app-banners',
  imports: [EmblaCarouselDirective, NgOptimizedImage, Button],
  templateUrl: './banners.html',
  styleUrl: './banners.scss',
  standalone: true
})
export class Banners implements AfterViewInit, OnDestroy {
  private emblaRef = viewChild<EmblaCarouselDirective>(EmblaCarouselDirective);
  private IsBrowser = inject(IsBrowser)

  textSpans = viewChildren<ElementRef>('textSpan');
  bannerImages = viewChildren<ElementRef>('bannerImg');

  textSpans2 = viewChildren<ElementRef>('textSpan2');
  bannerImages2 = viewChildren<ElementRef>('bannerImg2');
  underline = viewChild<ElementRef>('underline');
  underline2 = viewChild<ElementRef>('underline2');
  clipRect = viewChild<ElementRef>('clipRect');
  clipRect2 = viewChild<ElementRef>('clipRect2');
  bannerOne = viewChild<ElementRef>('bannerOne');
  bannerTwo = viewChild<ElementRef>('bannerTwo');

  private secondBannerAnimated = false;

  protected cardsOptions: EmblaOptionsType = {
    align: 'start',
  };
  protected selectedIndex = signal(0);
  modal = inject(ModalService);

  private animateUnderline() {
    if (!this.IsBrowser.isBrowser) return;
    const svg = this.underline()?.nativeElement as SVGSVGElement;
    if (!svg) return;
    const clipRect = this.clipRect()?.nativeElement;
    if (!clipRect) return;
    gsap.set(clipRect, {width: 0});
    let scrolled = false;
    ScrollTrigger.create({
      trigger: svg,
      start: 'top 80%',
      end: 'top 60%',
      toggleActions: 'play none none none',
      onEnter: () => {
        gsap.to(clipRect, {
          width: 218,
          duration: 0.6,
          delay: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            if (!scrolled) {
              setTimeout(() => {
                this.scrollTo(1);
              }, 500);
              scrolled = true;
            }
          },
        });
      },
      id: 'underline-scroll',
    });
  }

  private animateUnderline2() {
    if (!this.IsBrowser.isBrowser || this.secondBannerAnimated) return;
    const svg = this.underline2()?.nativeElement as SVGSVGElement;
    if (!svg) return;
    const clipRect = this.clipRect2()?.nativeElement;
    if (!clipRect) return;
    gsap.set(clipRect, {width: 0});
    gsap.to(clipRect, {
      width: 218,
      duration: 0.6,
      delay: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        this.secondBannerAnimated = true;
      },
    });
  }

  ngAfterViewInit() {
    this.animateUnderline();
  }

  ngOnDestroy() {
    gsap.killTweensOf(this.bannerOne()?.nativeElement);
    gsap.killTweensOf(this.bannerTwo()?.nativeElement);
  }

  private initAnimation() {
    //   const bannerOne = this.bannerOne()?.nativeElement;
    //   if (!bannerOne) return;
    //
    //   const textElements = this.textSpans();
    //   const images = this.bannerImages();
    //   const line = this.underline()?.nativeElement;
    //
    //   if (textElements.length === 0) return;
    //
    //   const [textOne, textTwo, textThree, textFour] = textElements.map(
    //     (ref) => ref.nativeElement
    //   );
    //   const imgElements = images.map((ref) => ref.nativeElement);
    //
    //   const tl = gsap.timeline({
    //     defaults: { ease: 'power3.out' },
    //     scrollTrigger: {
    //       trigger: bannerOne,
    //       start: 'center 80%',
    //       end: 'bottom 20%',
    //       toggleActions: 'play none none none',
    //       id: 'banner-one-animation',
    //     },
    //   });
    //
    //   tl.set(textOne, { y: -10, clipPath: 'inset(0 0 100% 0)' })
    //     .set(textTwo, { y: -10, clipPath: 'inset(0 0 100% 0)' })
    //     .set(textThree, { y: -10, clipPath: 'inset(0 0 100% 0)' })
    //     .set(textFour, { y: -10, clipPath: 'inset(0 0 100% 0)' })
    //     .set(imgElements, { scale: 0, opacity: 0, rotation: -180 })
    //     .set(line, { scaleX: 0, transformOrigin: 'left center' })
    //     .to(textOne, { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 })
    //     .to(
    //       textTwo,
    //       { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
    //       '-=0.7'
    //     )
    //     .to(
    //       textThree,
    //       { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
    //       '-=0.7'
    //     )
    //     .to(
    //       imgElements,
    //       {
    //         scale: 1,
    //         opacity: 1,
    //         rotation: 0,
    //         duration: 0.6,
    //         stagger: 0.1,
    //         ease: 'back.out(1.7)',
    //       },
    //       '-=1.0'
    //     )
    //     .to(
    //       textFour,
    //       { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
    //       '-=0.7'
    //     )
    //     .to(line, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, '-=0.8');
    // }
    //
    // private initSecondBannerAnimation() {
    //   const bannerTwo = this.bannerTwo()?.nativeElement;
    //   if (!bannerTwo) return;
    //
    //   const textElements = this.textSpans2();
    //   const images = this.bannerImages2();
    //   const line = this.underline2()?.nativeElement;
    //   if (textElements.length === 0) return;
    //
    //   const [textOne, textTwo, textThree, textFour, textFive, textSix] =
    //     textElements.map((ref) => ref.nativeElement);
    //   const imgElements = images.map((ref) => ref.nativeElement);
    //
    //   const tl = gsap.timeline({
    //     defaults: { ease: 'power3.out' },
    //     scrollTrigger: {
    //       trigger: bannerTwo,
    //       id: 'banner-two-animation',
    //     },
    //   });
    //
    //   tl.set(textOne, { y: -10, clipPath: 'inset(0 0 100% 0)' })
    //     .set(textTwo, { y: -10, clipPath: 'inset(0 0 100% 0)' })
    //     .set(textThree, { y: -10, clipPath: 'inset(0 0 100% 0)' })
    //     .set(textFour, { y: -10, clipPath: 'inset(0 0 100% 0)' })
    //     .set(textFive, { y: -10, clipPath: 'inset(0 0 100% 0)' })
    //     .set(textSix, { y: -10, clipPath: 'inset(0 0 100% 0)' })
    //     .set(imgElements, { scale: 0, opacity: 0, rotation: -180 })
    //     .to(textOne, { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 })
    //     .to(
    //       textTwo,
    //       { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
    //       '-=0.7'
    //     )
    //     .to(
    //       imgElements[0],
    //       {
    //         scale: 1,
    //         opacity: 1,
    //         rotation: 0,
    //         duration: 0.6,
    //         ease: 'back.out(1.7)',
    //       },
    //       '-=0.7'
    //     )
    //     .to(
    //       textThree,
    //       { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
    //       '-=0.7'
    //     )
    //     .to(
    //       textFour,
    //       { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
    //       '-=0.7'
    //     )
    //     .to(
    //       textFive,
    //       { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
    //       '-=0.7'
    //     )
    //     .to(
    //       textSix,
    //       { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0 },
    //       '-=0.7'
    //     )
    //     .to(
    //       line,
    //       {
    //         scaleX: 1,
    //         duration: 0.6,
    //         ease: 'power2.out',
    //       },
    //       '-=0.8'
    //     );
  }

  onEmblaChanged(event: EmblaEventType): void {
    if (event === 'select') {
      const api = this.emblaRef()?.emblaApi;
      if (api) {
        const currentIndex = api.selectedScrollSnap();
        this.selectedIndex.set(currentIndex);

        if (currentIndex === 1 && !this.secondBannerAnimated) {
          this.animateUnderline2();
          this.secondBannerAnimated = true;
        }
      }
    }
  }

  protected scrollTo(index: number): void {
    this.emblaRef()?.emblaApi?.scrollTo(index);
  }

  onOpenModal() {
    this.modal.open(SimModal, {data: {title: 'Выбери тип сим-карты'}});
  }
}
