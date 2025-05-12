import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PlantDashboardComponent } from './plant-dashboard.component';

describe('PlantDashboardComponent', () => {
  let component: PlantDashboardComponent;
  let fixture: ComponentFixture<PlantDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlantDashboardComponent]  // standalone component
    });

    fixture = TestBed.createComponent(PlantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with 10 plants', () => {
    const plants = component.plants();
    expect(plants.length).toBe(10);
  });

  it('should toggle plant running state correctly', () => {
    const originalState = component.plants().find(p => p.id === 1)?.running;
    component.togglePlantState(1);
    const updatedState = component.plants().find(p => p.id === 1)?.running;
    expect(updatedState).toBe(!originalState);
  });

  it('should update metric values to be between 0 and 100', () => {
    component['updateAllMetrics'](); // Directly invoke the method
    const updated = component.plants();
    updated.forEach(plant => {
      plant.metrics.forEach(metric => {
        expect(metric.value).toBeGreaterThanOrEqual(0);
        expect(metric.value).toBeLessThanOrEqual(100);
      });
    });
  });

});
