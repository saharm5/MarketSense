import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFundsComponent } from './top-funds.component';

describe('TopFundsComponent', () => {
  let component: TopFundsComponent;
  let fixture: ComponentFixture<TopFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopFundsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
