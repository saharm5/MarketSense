import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetAssetValueChartComponent } from './net-asset-value-chart.component';

describe('NetAssetValueChartComponent', () => {
  let component: NetAssetValueChartComponent;
  let fixture: ComponentFixture<NetAssetValueChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetAssetValueChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetAssetValueChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
