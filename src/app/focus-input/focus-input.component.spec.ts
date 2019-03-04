import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusInputComponent } from './focus-input.component';

describe('FocusInputComponent', () => {
  let component: FocusInputComponent;
  let fixture: ComponentFixture<FocusInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocusInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
