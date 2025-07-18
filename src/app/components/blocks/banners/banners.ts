import {Component, signal, viewChild} from '@angular/core';
import {EmblaCarouselDirective, EmblaEventType, EmblaOptionsType} from "embla-carousel-angular";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-banners',
    imports: [
        EmblaCarouselDirective,
    ],
  templateUrl: './banners.html',
  styleUrl: './banners.scss'
})
export class Banners {
  private emblaRef = viewChild<EmblaCarouselDirective>(EmblaCarouselDirective);
  protected cardsOptions: EmblaOptionsType = {
    align: 'start',
  };
  protected selectedIndex = signal(0);

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
}
