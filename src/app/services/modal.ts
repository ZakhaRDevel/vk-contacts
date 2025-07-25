import {
  Injectable,
  Injector,
  Type,
  ComponentRef,
  inject,
  signal,
  OnDestroy,
  RendererFactory2,
  Renderer2,
} from '@angular/core';
import {Overlay, OverlayRef, PositionStrategy} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {Subscription} from 'rxjs';

export interface ModalConfig {
  data?: any;
  width?: string;
  height?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  panelClass?: string;
  disableClose?: boolean;
}

@Injectable({providedIn: 'root'})
export class ModalService implements OnDestroy {
  private overlayRef?: OverlayRef;
  private overlay = inject(Overlay);
  private injector = inject(Injector);
  private backdropSubscription?: Subscription;
  isClosing = signal(false);
  isModalOpen = signal(false);
  private renderer: Renderer2 = inject(RendererFactory2).createRenderer(
    null,
    null
  );
  skipUnlockScroll = false;

  open<T>(component: Type<T>, config: ModalConfig = {}): ComponentRef<T> {
    if (this.isModalOpen()) {
      this.skipUnlockScroll = true;
      this.close();
      setTimeout(() => {
        this.openModal(component, config);
        this.skipUnlockScroll = false;
      }, 300);
      return {} as ComponentRef<T>;
    }

    this.lockScroll();
    return this.openModal(component, config);
  }

  private openModal<T>(
    component: Type<T>,
    config: ModalConfig = {}
  ): ComponentRef<T> {
    const positionStrategy = this.createPositionStrategy();

    this.overlayRef = this.overlay.create({
      positionStrategy,
      width: config.width,
      height: config.height,
      hasBackdrop: config.hasBackdrop ?? true,
      backdropClass: config.backdropClass ?? 'modal-backdrop',
      panelClass: config.panelClass ?? 'modal-panel',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const portal = new ComponentPortal(
      component,
      null,
      this.createInjector(config.data)
    );
    const componentRef = this.overlayRef.attach(portal);
    this.isModalOpen.set(true);

    if (config.hasBackdrop !== false) {
      this.backdropSubscription = this.overlayRef
        .backdropClick()
        .subscribe(() => {
          if (!config.disableClose) {
            this.close();
          }
        });
    }

    return componentRef;
  }

  close(): void {
    this.isClosing.set(true);
    this.backdropSubscription?.unsubscribe();
    this.backdropSubscription = undefined;
    setTimeout(() => {
      this.overlayRef?.dispose();
      this.isClosing.set(false);
      this.isModalOpen.set(false);
      if (!this.skipUnlockScroll) {
        this.unlockScroll();
      }
    }, 300);
  }

  ngOnDestroy(): void {
    this.backdropSubscription?.unsubscribe();
    this.overlayRef?.dispose();
    this.unlockScroll();
  }

  private createPositionStrategy(): PositionStrategy {
    return this.overlay.position().global().bottom('0').left('0').right('0');
  }

  private createInjector(data: any): Injector {
    return Injector.create({
      providers: [{provide: 'MODAL_DATA', useValue: data}],
      parent: this.injector,
    });
  }

  // --- Angular way: блокировка прокрутки через Renderer2 ---
  public lockScroll(): void {
    if (typeof document !== 'undefined') {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
  }

  public unlockScroll(): void {
    if (typeof document !== 'undefined') {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }
}
