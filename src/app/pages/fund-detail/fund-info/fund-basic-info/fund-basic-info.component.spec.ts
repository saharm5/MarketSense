import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundBasicInfoComponent } from './fund-basic-info.component';

describe('FundBasicInfoComponent', () => {
  let component: FundBasicInfoComponent;
  let fixture: ComponentFixture<FundBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundBasicInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
