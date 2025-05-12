//common modules
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// This service is responsible for managing notifications
export class NotificationService {
  // Properties to manage notification status and message
  notificationStatus  : boolean = false;

  // Property to manage the message to be displayed in the notification
  notificationMessage : string = '';

  constructor() { }

  // Method to notify the user
  notify(message: string): void {
    this.notificationStatus = true;
    this.notificationMessage = message;
  }
}