import {
  Component,
  viewChildren,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { Container } from '../container/container';
import { NgOptimizedImage } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-steps',
  imports: [Container, NgOptimizedImage],
  templateUrl: './steps.html',
  styleUrl: './steps.scss',
})
export class Steps implements AfterViewInit {
  stepItems = viewChildren<ElementRef>('stepItem');

  ngAfterViewInit() {
    this.initAnimation();
  }

  private initAnimation() {
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
}
