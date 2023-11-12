import { Component, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from './notification.service';

import { OverlayModule, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { NotificationDetailsComponent } from './notification-details/notification-details.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListItem, MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { PlatformModule, Platform } from '@angular/cdk/platform';

@Component({
  selector: 'captor-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIconModule,
    PlatformModule
  ]
})
export class NotificationComponent {
  filterVal: string = '';
  isConfirmClearAll = false;
  timeFrame: 'all' | 'today' = 'today';
  notifications: any[] = this._getTodayNotifications(this._service.notifications);
  showNotifications!: boolean;
  private _notificationDetailsRef !: ComponentRef<NotificationDetailsComponent>;
  private _overlayRef !: OverlayRef;
  private _isMouseOver = false;

  get isOpened() {
    this.showNotifications = this._service.isOpened;
    return this._service.isOpened;
  }

  get hasNotifications() {
    return this._service.notificationCount > 0;
  }

  get notificationSource() {
    return this._service.sources;
  }

  filterNotificationBySource(source: string) {
    return this.notifications.filter(({ source: _source }) => _source === source);
  }

  confirmClearAll() {
    this.isConfirmClearAll = false;
    this.notifications = this._service.clearAllNotifications();
    // todo: make notification subscribable (maybe)
  }

  getExpiresCountdown(expires: Date) {
    const today = new Date();
    const diff = expires.getTime() - today.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return days;
  }

  removeNotificationById(id: string) {
    this._service.removeNotification(id);
    this.notifications = this._getNotifications();
    this.closeDetails();
  }

  updateFilter() {
    this.notifications = this._getNotifications();
    // todo: how to deal with opened panel
  }

  onSelectedTimeFrameChange(timeFrame: any) {
    this.notifications = this._getNotifications();
    // todo:  panels status after timeframe change
  }


  _getNotifications() {
    let _notifications = this._service.notifications;

    if (this.filterVal.length > 2) {
      _notifications = this._applyFilter(this.filterVal, _notifications);
    }

    if (this.timeFrame === 'today') {
      _notifications = this._getTodayNotifications(_notifications);
    }

    return _notifications;
  }



  private _applyFilter(query: string, notifications: any[]) {
    return notifications.filter((x) => JSON.stringify(x).toLowerCase().indexOf(query) !== -1);
  }

  private _getTodayNotifications(notifications: any[]) {
    const today = new Date();

    return notifications.filter(({ time }) => {
      return time.getDate() === today.getDate() &&
        time.getMonth() === today.getMonth() &&
        time.getFullYear() === today.getFullYear()
    });
  }

  openDetails(origin: MatListItem, data: any) {
    console.log('open details');

    const positionStrategy = this._overlay.position()
      .flexibleConnectedTo(origin._elementRef.nativeElement)
      .withPositions([{
        originX: 'start',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'top',
      }])
      .withFlexibleDimensions(false)
      .withPush(true);


    const config = new OverlayConfig({
      positionStrategy,
      width: '300px',
      hasBackdrop: false,
      scrollStrategy: this._overlay.scrollStrategies.close()
    });

    // do i need overlay ref
    this._overlayRef = this._overlay.create(config);
    const detailsComponent = new ComponentPortal(NotificationDetailsComponent);
    const detailsComponentRef = this._overlayRef.attach(detailsComponent);

    // provide input
    detailsComponentRef.instance.header = data.title;
    detailsComponentRef.instance.content = data.content;
    detailsComponentRef.instance.createdDate = data.time;
    detailsComponentRef.instance.expiryDate = data.expires;

    this._notificationDetailsRef = detailsComponentRef;
    this._isMouseOver = true;
  }

  closeDetails() {
    this._isMouseOver = false;

    if (this._notificationDetailsRef && this._overlayRef) {
      this._overlayRef.dispose();
    }
  }

  handleTouchStart() {
    // TODO: CLEAN
    // if (!this._isMouseOver) {

    // }
  }

  handleTouchEnd() {
    // console.log('touch end');
    // this.closeDetails();
  }

  constructor(private _service: NotificationService,
    private _overlay: Overlay,
    private _platform: Platform
  ) { }
}
