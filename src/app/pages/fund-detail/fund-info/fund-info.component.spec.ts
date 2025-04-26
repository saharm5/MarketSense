import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundInfoComponent } from './fund-info.component';

describe('FundInfoComponent', () => {
  let component: FundInfoComponent;
  let fixture: ComponentFixture<FundInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
