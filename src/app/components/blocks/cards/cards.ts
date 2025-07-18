import {
  AfterViewInit,
  Component,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import {Container} from '../container/container';
import {
  EmblaCarouselDirective,
  EmblaEventType,
  EmblaOptionsType,
} from 'embla-carousel-angular';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-cards',
  imports: [Container, EmblaCarouselDirective, NgOptimizedImage],
  templateUrl: './cards.html',
  styleUrl: './cards.scss',
})
export class Cards {
  private emblaRef = viewChild<EmblaCarouselDirective>(EmblaCarouselDirective);
  protected cardsOptions: EmblaOptionsType = {
    align: 'start',
  };
  protected selectedIndex = signal(0);
  totalSlidesArr = computed(() => {
    const length = this.totalSlides();
    return Array.from({length}, (_, i) => i);
  });
  totalSlides = signal<number>(0);

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
