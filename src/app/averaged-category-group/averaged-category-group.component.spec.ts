import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AveragedCategoryGroupComponent } from './averaged-category-group.component';

describe('AveragedCategoryGroupComponent', () => {
  let component: AveragedCategoryGroupComponent;
  let fixture: ComponentFixture<AveragedCategoryGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AveragedCategoryGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AveragedCategoryGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
