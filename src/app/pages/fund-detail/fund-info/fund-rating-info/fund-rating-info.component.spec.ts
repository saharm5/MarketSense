import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRatingInfoComponent } from './fund-rating-info.component';

describe('FundRatingInfoComponent', () => {
  let component: FundRatingInfoComponent;
  let fixture: ComponentFixture<FundRatingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundRatingInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundRatingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
