import {Component, inject, signal, viewChild} from '@angular/core';
import {EmblaCarouselDirective, EmblaEventType, EmblaOptionsType} from "embla-carousel-angular";
import {NgOptimizedImage} from "@angular/common";
import {Button} from '../../ui/button/button';
import {ModalService} from '../../../services/modal';
import {SimModal} from '../../modal/sim-modal/sim-modal';

@Component({
  selector: 'app-banners',
  imports: [
    EmblaCarouselDirective,
    NgOptimizedImage,
    Button,
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
  modal = inject(ModalService);

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
    this.modal.open(SimModal, {data: {title: 'Выбери тип сим-карты'}});
  }
}
