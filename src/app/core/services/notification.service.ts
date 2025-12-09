import { Injectable, signal } from '@angular/core';
import { Notification, NotificationType } from './models/notification';

let counter = 0;

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notification = signal<Notification[]>([]);

  push(title: string, message: string, duration: number = 5000, type: NotificationType = "SUCCESS") {
    const id = ++counter;
    const notif: Notification = { id, title, message, duration, type };
    this.notification.update(list => [...list, notif]);

    setTimeout(() => {
      this.removeById(id);
    }, duration);
  }

  clear() {
    this.notification.set([]);
  }

  remove(index: number) {
    this.notification.update(list => list.filter((_, i) => i !== index));
  }

  removeById(id: number) {
    this.notification.update(list => list.filter(n => n.id !== id));
  }
}
