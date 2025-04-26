import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCompositionChartComponent } from './asset-composition-chart.component';

describe('AssetCompositionChartComponent', () => {
  let component: AssetCompositionChartComponent;
  let fixture: ComponentFixture<AssetCompositionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetCompositionChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetCompositionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
