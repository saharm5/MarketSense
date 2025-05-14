import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeMapPageComponent } from './tree-map-page.component';

describe('TreeMapPageComponent', () => {
  let component: TreeMapPageComponent;
  let fixture: ComponentFixture<TreeMapPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeMapPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
