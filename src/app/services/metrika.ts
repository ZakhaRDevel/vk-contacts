import { Injectable, inject } from '@angular/core';
import { IsBrowser } from './is-browser';

export interface MetrikaEvent {
  event: string;
  event_id: string;
  event_cat: string;
  event_name: string;
  event_param: string;
  reachGoal?: string;
  JSONInfo?: string;
  ecommerce?: unknown;
}

@Injectable({ providedIn: 'root' })
export class MetrikaService {
  private readonly isBrowser = inject(IsBrowser);
  private readonly projectStore = 'web_b2c [prod]'; // Замените на нужный для вашего проекта

  push(event: Omit<MetrikaEvent, 'constant_project_STORE'>): void {
    if (!this.isBrowser.isBrowser) return;
    if (typeof window === 'undefined') return;
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      ...event,
      constant_project_STORE: this.projectStore,
    });
  }
}
