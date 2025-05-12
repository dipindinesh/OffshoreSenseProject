//common modules
import { Component } from '@angular/core';

//services
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})

// This component is responsible for displaying notifications to the user
export class NotificationComponent {
  
  constructor(public  notification : NotificationService) { }
  
  // Method to close the notification
  onCloseButtonClick(): void {
    this.notification.notificationStatus = false;
  }

}
