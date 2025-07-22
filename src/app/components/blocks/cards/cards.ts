import {
  AfterViewInit,
  Component,
  computed,
  signal,
  viewChild,
  ElementRef,
  OnDestroy,
  viewChildren,
} from '@angular/core';
import { Container } from '../container/container';
import {
  EmblaCarouselDirective,
  EmblaEventType,
  EmblaOptionsType,
} from 'embla-carousel-angular';
import { NgOptimizedImage } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-cards',
  imports: [Container, EmblaCarouselDirective, NgOptimizedImage],
  templateUrl: './cards.html',
  styleUrl: './cards.scss',
})
export class Cards implements AfterViewInit, OnDestroy {
  private emblaRef = viewChild<EmblaCarouselDirective>(EmblaCarouselDirective);
  mainCard = viewChild<ElementRef>('mainCard');
  cardSlides = viewChildren<ElementRef>('cardSlide');
  cardsContainer = viewChild<ElementRef>('cardsContainer');

  protected cardsOptions: EmblaOptionsType = {
    align: 'start',
  };
  protected selectedIndex = signal(0);
  totalSlidesArr = computed(() => {
    const length = this.totalSlides();
    return Array.from({ length }, (_, i) => i);
  });
  totalSlides = signal<number>(0);

  ngAfterViewInit() {
    // this.initMainCardAnimation();
    // this.initStackScrollTrigger();
  }

  ngOnDestroy() {
    // const mainCardElement = this.mainCard()?.nativeElement;
    // if (mainCardElement) {
    //   gsap.killTweensOf(mainCardElement);
    // }
    // const slides = this.cardSlides();
    // slides.forEach((ref) => {
    //   gsap.killTweensOf(ref.nativeElement);
    // });
    // ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  private initMainCardAnimation() {
    const mainCardElement = this.mainCard()?.nativeElement;
    if (!mainCardElement) return;

    gsap.set(mainCardElement, {
      scale: 1.3,
      opacity: 0,
    });

    gsap.to(mainCardElement, {
      scale: 1,
      opacity: 1,
      duration: 1,
      delay: 2,
      ease: 'power3.out',
      id: 'main-card-animation',
    });
  }

  private initStackScrollTrigger() {
    const slides = this.cardSlides();
    const container = this.cardsContainer()?.nativeElement;
    if (!container || slides.length === 0) return;

    // Изначально: только 2 и последующие смещены
    slides.forEach((ref, i) => {
      gsap.set(ref.nativeElement, { xPercent: i === 0 ? 0 : -i * 100 });
    });

    const tl = gsap.timeline();
    // 4 → 3 → 2 (индексы 3, 2, 1)
    for (let i = slides.length - 1; i > 0; i--) {
      tl.to(
        slides[i].nativeElement,
        {
          xPercent: 0,
          duration: 0.85,
          ease: 'power3.out',
        },
        i === slides.length - 1 ? 0 : '-=0.7'
      );
    }

    ScrollTrigger.create({
      trigger: container,
      start: 'top 90%',
      end: 'bottom 10%',
      toggleActions: 'play reverse play reverse',
      animation: tl,
    });
  }

  onEmblaChanged(event: EmblaEventType): void {
    const api = this.emblaRef()?.emblaApi;
    if (!api) return;

    if (event === 'init') {
      this.totalSlides.set(api.slideNodes().length);
      this.selectedIndex.set(api.selectedScrollSnap());
    } else if (event === 'select') {
      this.selectedIndex.set(api.selectedScrollSnap());
    }
  }

  protected scrollTo(index: number): void {
    this.emblaRef()?.emblaApi?.scrollTo(index);
  }
}
