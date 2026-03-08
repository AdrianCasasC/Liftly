import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  notificationService = inject(NotificationService);
  notifications$ = this.notificationService.notifications$;

  dismiss(id: string) {
    this.notificationService.dismiss(id);
  }
}
