import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundComparisonComponent } from './fund-comparison.component';

describe('FundComparisonComponent', () => {
  let component: FundComparisonComponent;
  let fixture: ComponentFixture<FundComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundComparisonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
