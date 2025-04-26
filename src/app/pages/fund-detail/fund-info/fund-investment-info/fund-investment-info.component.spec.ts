import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundInvestmentInfoComponent } from './fund-investment-info.component';

describe('FundInvestmentInfoComponent', () => {
  let component: FundInvestmentInfoComponent;
  let fixture: ComponentFixture<FundInvestmentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundInvestmentInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundInvestmentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
