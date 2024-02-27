import { Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notificationOpened: boolean = true;

  /** Return current expanding status for the notification **/
  get isOpened(): boolean {
    return this._notificationOpened;
  }

  /** Get notifications from user service **/
  get notifications() {
    return this._user.notifications;
  }

  /** Getting application code from list of notifications to categorize **/
  get source() {
    const _sources = this.notifications.map(({ applicationCode }) => applicationCode);

    return [...new Set(_sources)];
  }

  /** Toggle the open and close status for the notification**/
  toggleNotification() {
    this._notificationOpened = !this._notificationOpened;
  }

  /** Remove one notification based on id selected. If success, remove notification from current array. **/
  removeNotification(id: string) {
    // this._notifications = this._notifications.filter(({ id }) => id !== _id);
    // return this._notifications;
  }

  /** Remove all notifications for current user **/
  clearAllNotifications() {
    // TODO:call server to clear all notifications
    // if (timeframe === 'all') {
    //   this._notifications = [];
    // } else {
    //   const today = new Date().toDateString();
    //   this._notifications = this._notifications.filter(({ time }) => time.toDateString() != today);
    // }

    // return this._notifications;
  }

  constructor(private _user: UserService) {
  }
}
