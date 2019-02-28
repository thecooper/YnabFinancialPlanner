import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YnabBudgetComponent } from './ynab-budget.component';

describe('YnabBudgetComponent', () => {
  let component: YnabBudgetComponent;
  let fixture: ComponentFixture<YnabBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YnabBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YnabBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
