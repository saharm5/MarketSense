import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundReturnInfoComponent } from './fund-return-info.component';

describe('FundReturnInfoComponent', () => {
  let component: FundReturnInfoComponent;
  let fixture: ComponentFixture<FundReturnInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundReturnInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundReturnInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
