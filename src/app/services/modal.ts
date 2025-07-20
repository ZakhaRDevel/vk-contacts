import {
  Injectable,
  Injector,
  Type,
  ComponentRef,
  inject,
  signal,
} from '@angular/core';
import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

export interface ModalConfig {
  data?: any;
  width?: string;
  height?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  panelClass?: string;
  disableClose?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private overlayRef?: OverlayRef;
  private overlay = inject(Overlay);
  private injector = inject(Injector);
  isClosing = signal(false);
  private isModalOpen = signal(false);

  open<T>(component: Type<T>, config: ModalConfig = {}): ComponentRef<T> {
    if (this.isModalOpen()) {
      this.close();
      setTimeout(() => {
        this.openModal(component, config);
      }, 300);
      return {} as ComponentRef<T>;
    }

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
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    const portal = new ComponentPortal(
      component,
      null,
      this.createInjector(config.data)
    );
    const componentRef = this.overlayRef.attach(portal);
    this.isModalOpen.set(true);

    if (config.hasBackdrop !== false) {
      this.overlayRef.backdropClick().subscribe(() => {
        if (!config.disableClose) {
          this.close();
        }
      });
    }

    return componentRef;
  }

  close(): void {
    this.isClosing.set(true);
    setTimeout(() => {
      this.overlayRef?.dispose();
      this.isClosing.set(false);
      this.isModalOpen.set(false);
    }, 300);
  }

  private createPositionStrategy(): PositionStrategy {
    return this.overlay.position().global().bottom('0').left('0').right('0');
  }

  private createInjector(data: any): Injector {
    return Injector.create({
      providers: [{ provide: 'MODAL_DATA', useValue: data }],
      parent: this.injector,
    });
  }
}
