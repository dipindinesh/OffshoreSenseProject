//common modules
import { Component, signal, WritableSignal } from '@angular/core';
import { interval } from 'rxjs';
import { CommonModule } from '@angular/common';

//components
import { PlantComponent } from '../../shared/components/plant/plant.component';
import { NotificationComponent } from '../../shared/components/notification/notification.component';

//models
import { Metric, Plant } from '../../shared/models/plant_model';

@Component({
  selector: 'app-plant-dashboard',
  standalone: true,
  imports: [CommonModule, PlantComponent, NotificationComponent],
  templateUrl: './plant-dashboard.component.html',
  styleUrls: ['./plant-dashboard.component.scss']
})

// This component is responsible for managing the plant dashboard
// It contains the logic to update plant metrics and toggle plant states
// It uses signals to manage the state of the plants

export class PlantDashboardComponent {

  // Signal to manage the state of the plants
  plants: WritableSignal<Plant[]> = signal([
    {
      id: 1,
      name: 'Plant A',
      running: true,
      metrics: [
        { name: 'Temperature', value: 0, unit: '°C', threshold: 60 },
        { name: 'Humidity', value: 0, unit: '%', threshold: 80 },
        { name: 'Pressure', value: 0, unit: 'kPa', threshold: 200 }
      ]
    },
    {
      id: 2,
      name: 'Plant B',
      running: true,
      metrics: [
        { name: 'Temperature', value: 0, unit: '°C', threshold: 60 },
        { name: 'Humidity', value: 0, unit: '%', threshold: 80 },
        { name: 'Pressure', value: 0, unit: 'kPa', threshold: 200 }
      ]
    },
    {
      id: 3,
      name: 'Plant C',
      running: true,
      metrics: [
        { name: 'Temperature', value: 0, unit: '°C', threshold: 65 },
        { name: 'Humidity', value: 0, unit: '%', threshold: 75 },
        { name: 'Pressure', value: 0, unit: 'kPa', threshold: 190 }
      ]
    },
    {
      id: 4,
      name: 'Plant D',
      running: true,
      metrics: [
        { name: 'Temperature', value: 0, unit: '°C', threshold: 70 },
        { name: 'Humidity', value: 0, unit: '%', threshold: 85 },
        { name: 'Pressure', value: 0, unit: 'kPa', threshold: 210 }
      ]
    },
    {
      id: 5,
      name: 'Plant E',
      running: true,
      metrics: [
        { name: 'Temperature', value: 0, unit: '°C', threshold: 60 },
        { name: 'Humidity', value: 0, unit: '%', threshold: 78 },
        { name: 'Pressure', value: 0, unit: 'kPa', threshold: 205 }
      ]
    },
    {
      id: 6,
      name: 'Plant F',
      running: true,
      metrics: [
        { name: 'Temperature', value: 0, unit: '°C', threshold: 68 },
        { name: 'Humidity', value: 0, unit: '%', threshold: 82 },
        { name: 'Pressure', value: 0, unit: 'kPa', threshold: 195 }
      ]
    },
    {
      id: 7,
      name: 'Plant G',
      running: true,
      metrics: [
        { name: 'Temperature', value: 0, unit: '°C', threshold: 67 },
        { name: 'Humidity', value: 0, unit: '%', threshold: 76 },
        { name: 'Pressure', value: 0, unit: 'kPa', threshold: 202 }
      ]
    },
    {
      id: 8,
      name: 'Plant H',
      running: true,
      metrics: [
        { name: 'Temperature', value: 0, unit: '°C', threshold: 64 },
        { name: 'Humidity', value: 0, unit: '%', threshold: 79 },
        { name: 'Pressure', value: 0, unit: 'kPa', threshold: 198 }
      ]
    },
    {
      id: 9,
      name: 'Plant I',
      running: true,
      metrics: [
        { name: 'Temperature', value: 0, unit: '°C', threshold: 66 },
        { name: 'Humidity', value: 0, unit: '%', threshold: 80 },
        { name: 'Pressure', value: 0, unit: 'kPa', threshold: 200 }
      ]
    },
    {
      id: 10,
      name: 'Plant J',
      running: true,
      metrics: [
        { name: 'Temperature', value: 0, unit: '°C', threshold: 70 },
        { name: 'Humidity', value: 0, unit: '%', threshold: 77 },
        { name: 'Pressure', value: 0, unit: 'kPa', threshold: 193 }
      ]
    }
  ]);
  
  constructor() {
    interval(5000).subscribe(() => this.updateAllMetrics());
  }

  // Method to toggle the running state of a plant
  // It updates the plant's state in the signal
  togglePlantState(plantId: number): void {
    this.plants.update(plants =>
      plants.map(p =>
        p.id === plantId ? { ...p, running: !p.running } : p
      )
    );
  }

  // Method to update all plant metrics
  // It simulates the update of metrics by generating random values
  private updateAllMetrics(): void {
    this.plants.update(plants =>
      plants.map(plant => ({
        ...plant,
        metrics: plant.metrics.map( (metric : Metric) => ({
          ...metric,
          value: Math.round(Math.random() * 100)
        }))
      }))
    );
  }
}
