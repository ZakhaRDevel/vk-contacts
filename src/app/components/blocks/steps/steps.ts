import {
  Component,
  viewChildren,
  AfterViewInit,
  ElementRef, inject,
} from '@angular/core';
import {Container} from '../container/container';
import {NgOptimizedImage} from '@angular/common';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {IsBrowser} from '../../../services/is-browser';

@Component({
  selector: 'app-steps',
  imports: [Container, NgOptimizedImage],
  templateUrl: './steps.html',
  styleUrl: './steps.scss',
})
export class Steps implements AfterViewInit {
  stepItems = viewChildren<ElementRef>('stepItem');
  arrows = viewChildren<ElementRef>('arrow');
  private IsBrowser = inject(IsBrowser)

  ngAfterViewInit() {
    this.initAnimation();
    this.initArrowAnimation();
  }

  private initAnimation() {
    if (!this.IsBrowser.isBrowser) return;
    const stepElements = this.stepItems();
    if (stepElements.length === 0) return;

    stepElements.forEach((ref, index) => {
      const element = ref.nativeElement;
      const rotation = index % 2 === 0 ? 5 : -5;

      gsap.to(element, {
        rotation: rotation,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'center 70%',
          end: 'center 30%',
          toggleActions: 'play reverse play reverse',
        },
      });
    });
  }

  private initArrowAnimation() {
    if (!this.IsBrowser.isBrowser) return;
    const arrows = this.arrows();
    arrows.forEach((ref) => {
      const arrowEl = ref.nativeElement;
      ScrollTrigger.create({
        trigger: arrowEl,
        start: 'top 80%',
        end: 'top 60%',
        toggleActions: 'play reverse play reverse',
        onEnter: () => {
          arrowEl.classList.add('visible');
        },
        onLeaveBack: () => {
          arrowEl.classList.remove('visible');
        },
      });
    });
  }
}
