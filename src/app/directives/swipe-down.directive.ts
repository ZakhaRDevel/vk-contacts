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
  },
})
export class SwipeDownDirective {
  @Input() threshold = 100;
  @Input() enabled = true;
  @Output() swipeDown = new EventEmitter<void>();

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
      event.preventDefault();
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging() || !this.enabled) return;

    const deltaY = this.currentY - this.startY;

    if (deltaY > this.threshold) {
      this.swipeDown.emit();
    }

    this.isDragging.set(false);
  }
}
