import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipCompositionComponent } from './ownership-composition.component';

describe('OwnershipCompositionComponent', () => {
  let component: OwnershipCompositionComponent;
  let fixture: ComponentFixture<OwnershipCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnershipCompositionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnershipCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
