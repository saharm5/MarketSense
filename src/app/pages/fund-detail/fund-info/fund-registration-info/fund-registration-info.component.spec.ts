import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRegistrationInfoComponent } from './fund-registration-info.component';

describe('FundRegistrationInfoComponent', () => {
  let component: FundRegistrationInfoComponent;
  let fixture: ComponentFixture<FundRegistrationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundRegistrationInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundRegistrationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
