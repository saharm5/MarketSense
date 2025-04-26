import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitPriceComparisonChartComponent } from './unit-price-comparison-chart.component';

describe('UnitPriceComparisonChartComponent', () => {
  let component: UnitPriceComparisonChartComponent;
  let fixture: ComponentFixture<UnitPriceComparisonChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitPriceComparisonChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitPriceComparisonChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
