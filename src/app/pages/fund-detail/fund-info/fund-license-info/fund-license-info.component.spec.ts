import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundLicenseInfoComponent } from './fund-license-info.component';

describe('FundLicenseInfoComponent', () => {
  let component: FundLicenseInfoComponent;
  let fixture: ComponentFixture<FundLicenseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundLicenseInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundLicenseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
