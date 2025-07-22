import {
  Component,
  signal,
  computed,
  inject,
  input,
  HostBinding,
} from '@angular/core';
import { IsBrowser } from '../../../services/is-browser';

const COOKIE_KEY = 'cookie-consent-expire';
const EXPIRE_DAYS = 365;

@Component({
  selector: 'app-cookie',
  standalone: true,
  templateUrl: './cookie.html',
  styleUrl: './cookie.scss',
})
export class Cookie {
  private readonly isBrowser = inject(IsBrowser);
  private readonly expireDate = signal<Date | null>(null);

  withOffset = input(false);
  readonly isShow = computed(() => {
    if (!this.isBrowser.isBrowser) return false;
    const expire = this.expireDate();
    if (!expire) return true;
    return new Date() > expire;
  });

  constructor() {
    if (this.isBrowser.isBrowser) {
      const stored = localStorage.getItem(COOKIE_KEY);
      this.expireDate.set(stored ? new Date(JSON.parse(stored)) : null);
    }
  }

  onAccept(): void {
    if (!this.isBrowser.isBrowser) return;
    const expire = new Date();
    expire.setDate(expire.getDate() + EXPIRE_DAYS);
    localStorage.setItem(COOKIE_KEY, JSON.stringify(expire.toISOString()));
    this.expireDate.set(expire);
  }

  resetCookie(): void {
    if (!this.isBrowser.isBrowser) return;
    localStorage.removeItem(COOKIE_KEY);
    this.expireDate.set(null);
  }
}
