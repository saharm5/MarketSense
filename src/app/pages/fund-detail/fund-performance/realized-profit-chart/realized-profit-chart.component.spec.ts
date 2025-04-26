import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizedProfitChartComponent } from './realized-profit-chart.component';

describe('RealizedProfitChartComponent', () => {
  let component: RealizedProfitChartComponent;
  let fixture: ComponentFixture<RealizedProfitChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizedProfitChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizedProfitChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
