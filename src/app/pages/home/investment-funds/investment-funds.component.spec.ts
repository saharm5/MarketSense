import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentFundsComponent } from './investment-funds.component';

describe('InvestmentFundsComponent', () => {
  let component: InvestmentFundsComponent;
  let fixture: ComponentFixture<InvestmentFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentFundsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
