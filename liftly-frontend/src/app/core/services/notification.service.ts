export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSource = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSource.asObservable();

  constructor() {}

  showSuccess(message: string, duration: number = 3000) {
    this.show({ id: this.generateId(), type: 'success', message }, duration);
  }

  showError(message: string, duration: number = 5000) {
    this.show({ id: this.generateId(), type: 'error', message }, duration);
  }

  showInfo(message: string, duration: number = 3000) {
    this.show({ id: this.generateId(), type: 'info', message }, duration);
  }

  private show(notification: Notification, duration: number) {
    const currentList = this.notificationsSource.value;
    this.notificationsSource.next([...currentList, notification]);

    setTimeout(() => {
      this.dismiss(notification.id);
    }, duration);
  }

  dismiss(id: string) {
    const currentList = this.notificationsSource.value;
    this.notificationsSource.next(currentList.filter(n => n.id !== id));
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
