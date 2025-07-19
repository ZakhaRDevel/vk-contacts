import { Component, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="accordion">
      <div class="accordion-item" [class.expanded]="isExpanded()">
        <button
          class="accordion-header"
          (click)="toggle()"
          [attr.aria-expanded]="isExpanded()"
        >
          {{ title }}
          <span class="accordion-icon"></span>
        </button>

        <div class="accordion-content" [class.expanded]="isExpanded()">
          <div class="accordion-body">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./accordion.scss'],
})
export class AccordionComponent {
  @Input() title = 'Заголовок аккордеона';
  @Input() defaultExpanded = false;

  isExpanded = signal(this.defaultExpanded);

  toggle(): void {
    this.isExpanded.update((expanded) => !expanded);
  }
}
