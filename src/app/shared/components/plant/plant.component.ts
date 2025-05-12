//common modules
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

//models
import { Metric } from '../../models/plant_model';

//services
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../../services/interceptor';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-plant',
  imports: [CommonModule],
  templateUrl: './plant.component.html',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  styleUrl: './plant.component.scss'
})

// This component is responsible for displaying the plant details
export class PlantComponent implements OnChanges {
  
  // Input property to receive plant details from the parent component
  @Input() plantDetails: any;

  // Property to manage the state of the plant 
  isReducingTemp : boolean  = false;
  
  constructor(private notifier: NotificationService) {}
  
  // Method to initialize the component
  ngOnChanges(): void {
    this.checkThresholds();
  }

  // Method to reduce the temperature of the plant
  reduceTemperature(): void {
    this.isReducingTemp = true;
    // Simulate delay (e.g., API call)
    setTimeout(() => {
      const tempMetric = this.plantDetails.metrics.find((m: Metric) => m.name === 'Temperature');
      if (tempMetric && tempMetric.value > 0) {
        tempMetric.value -= 5;
      }
      this.checkThresholds();

      this.isReducingTemp = false;
    }, 1500);
  }

  // Method to stop the plant
  stopPlant(): void {
    this.plantDetails.running = false;
  }
  
  // Method to check if any metric exceeds its threshold
  checkThresholds(): void {
    this.plantDetails.metrics.forEach( (metric : Metric) => {
      if (metric.value > metric.threshold) {
        this.notifier.notify(`${this.plantDetails.name} - ${metric.name} exceeds threshold!`);
      }
    });
  }
}
