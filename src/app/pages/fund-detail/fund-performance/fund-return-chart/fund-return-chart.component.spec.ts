import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundReturnChartComponent } from './fund-return-chart.component';

describe('FundReturnChartComponent', () => {
  let component: FundReturnChartComponent;
  let fixture: ComponentFixture<FundReturnChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundReturnChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundReturnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
