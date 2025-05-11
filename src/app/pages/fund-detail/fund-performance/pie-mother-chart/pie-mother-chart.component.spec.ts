import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieMotherChartComponent } from './pie-mother-chart.component';

describe('PieMotherChartComponent', () => {
  let component: PieMotherChartComponent;
  let fixture: ComponentFixture<PieMotherChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieMotherChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieMotherChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
