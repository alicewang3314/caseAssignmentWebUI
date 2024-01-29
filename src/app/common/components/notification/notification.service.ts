import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notificationOpened: boolean = true;
  private _notifications: any[] = [
    {
      id: 1,
      title: 'New Captor Notification 1',
      content: `Dave found joy in the daily routine of life.
      He awoke at the same time, ate the same breakfast and
      drove the same commute. He worked at a job that never
      seemed to change and he got home at 6 pm sharp every
      night. It was who he had been for the last ten years
      and he had no idea that was all about to change.`,
      time: new Date(2023, 9, 11),
      expires: new Date(2025, 9, 1),
      source: 'captor'
    },
    {
      id: 2,
      title: 'New Captor Notification 2',
      content: `His mother had always taught him not to ever
      think of himself as better than others. He'd tried to
      live by this motto. He never looked down on those who
       were less fortunate or who had less money than him.
        But the stupidity of the group of people he was talking
        to made him change his mind.`,
      time: new Date(2023, 9, 11),
      expires: new Date(2025, 9, 1),
      source: 'captor'
    },
    {
      id: 3,
      title: 'New Captor Notification 3',
      content: `His mother had always taught him not to ever
      think of himself as better than others. He'd tried to live
      by this motto. He never looked down on those who were less
      fortunate or who had less money than him. But the stupidity
      of the group of people he was talking to made him change his
       mind.`,
      time: new Date(2023, 7, 11),
      expires: new Date(2025, 7, 12),
      source: 'captor'
    },
    {
      id: 4,
      title: 'New Captor Notification 4',
      content: `His mother had always taught him not to ever
      think of himself as better than others. He'd tried to
      live by this motto. He never looked down on those who
      were less fortunate or who had less money than him. But
       the stupidity of the group of people he was talking to
       made him change his mind.`,
      expires: new Date(2025, 9, 12),
      time: new Date(),
      source: 'vans'
    },
    {
      id: 5,
      title: 'New Captor Notification 5',
      content: `He had three simple rules by which he lived.
       The first was to never eat blue food. There was nothing
        in nature that was edible that was blue. People often
         asked about blueberries, but everyone knows those are
         actually purple. He understood it was one of the stranger
          rules to live by, but it had served him well thus far in
           the 50+ years of his life.`,
      time: new Date(),
      expires: new Date(2025, 9, 12),
      source: 'vans'
    },
    {
      id: 6,
      title: 'New Captor Notification 6',
      content: `His mother had always taught him not to ever
      think of himself as better than others. He'd tried to live
      by this motto. He never looked down on those who were less
      fortunate or who had less money than him. But the stupidity
      of the group of people he was talking to made him change his
       mind.`,
      time: new Date(2023, 7, 11),
      expires: new Date(2025, 7, 12),
      source: 'ims'
    },
    {
      id: 7,
      title: 'New Captor Notification 7',
      content: `His mother had always taught him not to ever
      think of himself as better than others. He'd tried to
      live by this motto. He never looked down on those who
      were less fortunate or who had less money than him. But
       the stupidity of the group of people he was talking to
       made him change his mind.`,
      expires: new Date(2025, 9, 12),
      time: new Date(),
      source: 'ims'
    },
    {
      id: 8,
      title: 'New Captor Notification 8',
      content: `His mother had always taught him not to ever
      think of himself as better than others. He'd tried to
      live by this motto. He never looked down on those who
      were less fortunate or who had less money than him. But
       the stupidity of the group of people he was talking to
       made him change his mind.`,
      expires: new Date(2025, 9, 12),
      time: new Date(),
      source: 'ims'
    }
  ];

  get isOpened(): boolean {
    return this._notificationOpened;
  }

  get notifications() {
    return this._notifications;
  }

  get sources() {
    const _sources = this._notifications.map(({ source }) => source);

    return [...new Set(_sources)];
  }

  get notificationCount(): number {
    return this.notifications.length;
  }

  toggleNotification() {
    this._notificationOpened = !this._notificationOpened;
  }

  removeNotification(_id: string) {
    this._notifications = this._notifications.filter(({ id }) => id !== _id);
    return this._notifications;
  }

  clearAllNotifications(timeframe: 'all' | 'today') {
    // TODO:call server to clear all notifications
    if (timeframe === 'all') {
      this._notifications = [];
    } else {
      const today = new Date().toDateString();
      this._notifications = this._notifications.filter(({ time }) => time.toDateString() != today);
    }

    // return this._notifications;
  }

  constructor() { }
}
