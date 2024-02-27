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
// import { PlatformModule } from '@angular/cdk/platform'; // eheck if its required for Ipad

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
    // PlatformModule
  ]
})
export class NotificationComponent {
  filterVal: string = '';
  isConfirmClearAll = false;
  timeFrame: 'all' | 'today' = 'today';
  notifications: any[] = this._getNotifications();
  source: any[] = this._service.source;
  showNotifications!: boolean;
  private _notificationDetailsRef !: ComponentRef<NotificationDetailsComponent>;
  private _overlayRef !: OverlayRef;
  // private _isMouseOver = false;

  /** Get notification expand status from notification service.**/
  get isOpened() {
    this.showNotifications = this._service.isOpened;
    return this._service.isOpened;
  }

  /** Check if there is any notification for current user ignore timeframe and filter **/
  get hasNotifications() {
    return this._service.notifications.length > 0;
  }

  /** Filter and return list of notifications for the selected application **/
  filterNotificationByApp(app: string) {
    return this.notifications.filter(({ applicationCode }) => app === applicationCode);
  }

  /** Hide confirm clear all button **/
  confirmClearAll() {
    this.isConfirmClearAll = false;
    this._service.clearAllNotifications();
    this.notifications = this._getNotifications();
  }

  /** Calculate the difference between today and expiration **/
  getExpiresCountdown(expires: any) {
    const today = new Date();
    const diff = new Date(expires).getTime() - today.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return days;
  }

  /** Call service to remove a notification by its id Manually close the details opened.**/
  removeNotificationById(id: string) {
    this._service.removeNotification(id);
    this.closeDetails();
  }

  /** Reload notifications when filter or timeframe change **/
  updateNotification() {
    this.notifications = this._getNotifications();
  }

  /** Helper function getting notification based on currnet filter and selected time frame*/
  private _getNotifications() {
    let _notifications = this._service.notifications;

    if (this.filterVal.length > 2) {
      _notifications = this._applyFilter(this.filterVal, _notifications);
    }

    if (this.timeFrame === 'today') {
      _notifications = this._getTodayNotifications(_notifications);
    }

    return _notifications;
  }

  /** A helper function to apply filter to notifications **/
  private _applyFilter(query: string, notifications: any[]) {
    return notifications.filter((x) => JSON.stringify(x).toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }


  /** A helper function to get all notification created today. **/
  private _getTodayNotifications(notifications: any[]) {
    const today = new Date().toDateString();

    return notifications.filter((x: any) => new Date(x.queue[0].createdDate).toDateString() === today);
  }

  /** Arrange notification details component **/
  openDetails(origin: MatListItem, data: any) {
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

    // TODO: do i need overlay ref??
    this._overlayRef = this._overlay.create(config);
    const detailsComponent = new ComponentPortal(NotificationDetailsComponent);
    const detailsComponentRef = this._overlayRef.attach(detailsComponent);

    // Pass proptery to details component
    detailsComponentRef.instance.header = data.subject;
    detailsComponentRef.instance.content = data.text;
    detailsComponentRef.instance.createdDate = data.queue[0].createdDate;
    detailsComponentRef.instance.expiryDate = data.queue[0].expirationDueDate;

    this._notificationDetailsRef = detailsComponentRef;
    // this._isMouseOver = true;
  }

  /** Cloase notification details and dispose overlay **/
  closeDetails() {
    // this._isMouseOver = false;

    if (this._notificationDetailsRef && this._overlayRef) {
      this._overlayRef.dispose();
    }
  }

  constructor(
    private _service: NotificationService,
    private _overlay: Overlay
  ) { }
}
