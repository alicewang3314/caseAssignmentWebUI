
import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoadingComponent } from './loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading: boolean = false;
  private _overlayRef!: OverlayRef;

  get isOpen() {
    return this._isLoading;
  }

  open() {
    if (this._isLoading) return;

    if (!this._overlayRef) {
      this._overlayRef = this._overlay.create({
        positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
        hasBackdrop: true
      });
    }
    this._overlayRef.attach(new ComponentPortal(LoadingComponent));
    this._isLoading = true;
  }

  close() {
    if (!this._isLoading || !this._overlayRef) return;

    this._overlayRef.detach();
    this._isLoading = false;
  }

  constructor(private _overlay: Overlay) { }
}
