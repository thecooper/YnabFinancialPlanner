import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AveragedCategoryComponent } from './averaged-category.component';

describe('AveragedCategoryComponent', () => {
  let component: AveragedCategoryComponent;
  let fixture: ComponentFixture<AveragedCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AveragedCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AveragedCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
