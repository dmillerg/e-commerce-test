import { CommonModule } from '@angular/common';
import { Component, signal, effect } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class NotificationComponent {
  notifications = this.notificationService.notification;
  progressMap = signal<Record<number, number>>({});

  constructor(protected notificationService: NotificationService) {
    effect(() => {
      const list = this.notifications();
      list.forEach((n) => {
        this.progressMap.update(map => ({ ...map, [n.id]: 100 }));
        setTimeout(() => {
          this.progressMap.update(map => ({ ...map, [n.id]: 0 }));
        }, 50);
      });
    }, { allowSignalWrites: true });
  }

  getProgress(id: number): number {
    return this.progressMap()[id] ?? 100;
  }
}
