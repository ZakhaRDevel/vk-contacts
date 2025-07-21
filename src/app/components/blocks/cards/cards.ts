import {
  AfterViewInit,
  Component,
  computed,
  signal,
  viewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import {Container} from '../container/container';
import {
  EmblaCarouselDirective,
  EmblaEventType,
  EmblaOptionsType,
} from 'embla-carousel-angular';
import {NgOptimizedImage} from '@angular/common';
import {gsap} from 'gsap';

@Component({
  selector: 'app-cards',
  imports: [Container, EmblaCarouselDirective, NgOptimizedImage],
  templateUrl: './cards.html',
  styleUrl: './cards.scss',
})
export class Cards implements AfterViewInit, OnDestroy {
  private emblaRef = viewChild<EmblaCarouselDirective>(EmblaCarouselDirective);
  mainCard = viewChild<ElementRef>('mainCard');

  protected cardsOptions: EmblaOptionsType = {
    align: 'start',
  };
  protected selectedIndex = signal(0);
  totalSlidesArr = computed(() => {
    const length = this.totalSlides();
    return Array.from({length}, (_, i) => i);
  });
  totalSlides = signal<number>(0);

  ngAfterViewInit() {
    this.initMainCardAnimation();
  }

  ngOnDestroy() {
    const mainCardElement = this.mainCard()?.nativeElement;
    if (mainCardElement) {
      gsap.killTweensOf(mainCardElement);
    }
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
