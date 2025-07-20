import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';

@Directive({
  selector: '[swipeDown]',
  standalone: true,
  host: {
    '(touchstart)': 'onTouchStart($event)',
    '(touchmove)': 'onTouchMove($event)',
    '(touchend)': 'onTouchEnd($event)',
    '[style.touch-action]': '"pan-y"',
  },
})
export class SwipeDownDirective {
  @Input() threshold = 100;
  @Input() enabled = true;
  @Output() swipeDown = new EventEmitter<void>();
  @Output() swipeProgress = new EventEmitter<number>();

  private isDragging = signal(false);
  private startY = 0;
  private currentY = 0;

  constructor(private elementRef: ElementRef) {}

  onTouchStart(event: TouchEvent): void {
    if (!this.enabled) return;

    this.isDragging.set(true);
    this.startY = event.touches[0].clientY;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging() || !this.enabled) return;

    this.currentY = event.touches[0].clientY;
    const deltaY = this.currentY - this.startY;

    if (deltaY > 0) {
      const translateY = Math.min(deltaY, this.threshold);
      const opacity = Math.max(0, 1 - translateY / this.threshold);
      const progress = translateY / this.threshold;

      this.elementRef.nativeElement.style.transform = `translateY(${translateY}px)`;
      this.elementRef.nativeElement.style.opacity = opacity.toString();
      this.swipeProgress.emit(progress);
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging() || !this.enabled) return;

    const deltaY = this.currentY - this.startY;

    if (deltaY > this.threshold) {
      // Запускаем анимацию закрытия
      this.elementRef.nativeElement.style.animation =
        'modalSlideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
      this.swipeDown.emit();
    } else {
      // Возвращаем на место
      this.elementRef.nativeElement.style.transform = '';
      this.elementRef.nativeElement.style.opacity = '';
    }

    this.isDragging.set(false);
  }
}
