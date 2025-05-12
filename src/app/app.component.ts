import { Component } from '@angular/core';
import { PlantDashboardComponent } from './components/plant-dashboard/plant-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [
    PlantDashboardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'OffshoreSense';
}
