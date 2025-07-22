import {inject, Injectable, PLATFORM_ID, signal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IsBrowser {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId)
}
