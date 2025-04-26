import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipCompositionChartComponent } from './ownership-composition-chart.component';

describe('OwnershipCompositionChartComponent', () => {
  let component: OwnershipCompositionChartComponent;
  let fixture: ComponentFixture<OwnershipCompositionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnershipCompositionChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnershipCompositionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
