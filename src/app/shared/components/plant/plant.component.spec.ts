import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PlantComponent } from './plant.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('PlantComponent', () => {
  let component: PlantComponent;
  let fixture: ComponentFixture<PlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule,PlantComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantComponent);
    component = fixture.componentInstance;

    // Mock data for plant details
    component.plantDetails = {
      id: 1,
      name: 'Plant A',
      running: true,
      metrics: [
        { name: 'Temperature', value: 70, unit: '°C', threshold: 60 },
        { name: 'Humidity', value: 50, unit: '%', threshold: 80 },
        { name: 'Pressure', value: 180, unit: 'kPa', threshold: 200 },
      ]
    };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  // Test if the component initializes with the correct plant details
  it('should display plant name', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('Plant A');
  });

  // Test if the component initializes with the correct metrics
  it('should disable reduce button and show loading text when reducing', fakeAsync(() => {
    const reduceBtn = fixture.debugElement.query(By.css('button'));
    component.reduceTemperature();
    fixture.detectChanges();

    // While reducing
    expect(component.isReducingTemp).toBeTrue();
    expect(reduceBtn.nativeElement.disabled).toBeTrue();
    expect(reduceBtn.nativeElement.textContent).toContain('Reducing...');

    // Wait for the timeout
    tick(1500);
    fixture.detectChanges();

    expect(component.isReducingTemp).toBeFalse();
    expect(reduceBtn.nativeElement.textContent).toContain('Reduce Temperature');
  }));

  // Test if the temperature value is reduced correctly
  it('should reduce temperature value by 5 after delay', fakeAsync(() => {
    const tempBefore = component.plantDetails.metrics.find((m: { name: string; }) => m.name === 'Temperature')!.value;

    component.reduceTemperature();
    tick(1500);

    const tempAfter = component.plantDetails.metrics.find((m: { name: string; }) => m.name === 'Temperature')!.value;
    expect(tempAfter).toBe(tempBefore - 5);
  }));

  // Test if the notification is triggered when a metric exceeds its threshold
  it('should stop the plant', () => {
    component.stopPlant();
    expect(component.plantDetails.running).toBeFalse();
  });

  // Test if the notification is triggered when a metric exceeds its threshold
  it('should disable Stop Running button when plant is already stopped', () => {
    component.plantDetails.running = false;
    fixture.detectChanges();

    const stopBtn = fixture.debugElement.query(By.css('button:last-child')).nativeElement;
    expect(stopBtn.disabled).toBeTrue();
  });
});
