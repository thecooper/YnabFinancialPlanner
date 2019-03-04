import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { AveragedCategory } from '../averaged-category';
import { Subdivision } from '../subdivision';
import { Subscription, fromEvent } from 'rxjs';
import { FocusInputComponent } from '../focus-input/focus-input.component';
import { CategoryUpdatorService } from '../category-updator.service';

@Component({
  selector: 'app-averaged-category',
  templateUrl: './averaged-category.component.html',
  styleUrls: ['./averaged-category.component.scss']
})
export class AveragedCategoryComponent implements OnInit, OnChanges {

  @Input() category: AveragedCategory;
  @Input() subdivision: Subdivision;
  @ViewChild(FocusInputComponent) focusedInput: FocusInputComponent;

  changingAlloted = false;
  budgetValueDirty = true;

  private temporaryAllotedValue: string;

  constructor(private categoryUpdatorService: CategoryUpdatorService) { }

  ngOnInit() {
    this.calculateAllotment();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['subdivision']) {
      this.calculateAllotment();
    }
  }

  calculateAllotment() {
    switch (this.subdivision) {
      case 'weekly':
        this.category.currentAllotment = this.category.monthlyBudgeted * 12 / 52;
        break;
      case 'bi-monthly':
        this.category.currentAllotment = this.category.monthlyBudgeted / 2;
        break;
      case 'bi-weekly':
        this.category.currentAllotment = this.category.monthlyBudgeted * 12 / 26;
        break;
      case 'monthly':
      default:
        this.category.currentAllotment = this.category.monthlyBudgeted;
        break;
    }
  }

  clearAllotment() {
    this.category.currentAllotment = 0;
  }

  updateAllotment() {
    const updatedValue = +this.temporaryAllotedValue.replace('$', '');

    if (isNaN(updatedValue)) {
      this.cancelAllotment();
      return;
    }

    this.category.currentAllotment = Math.round(updatedValue * 100) / 100;
    this.changingAlloted = false;
    this.temporaryAllotedValue = '';
    this.budgetValueDirty = true;
  }

  editAlloted() {
    this.changingAlloted = true;
    this.temporaryAllotedValue = this.category.currentAllotment.toString();
  }

  updateEditedValue(value: string) {
    this.temporaryAllotedValue = value;
  }

  allotedKeydownEvent(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.updateAllotment();
    } else if (event.keyCode === 27 || event.keyCode === 9) {
      this.cancelAllotment();
    }
  }

  cancelAllotment() {
    this.changingAlloted = false;
    this.temporaryAllotedValue = '';
  }

  updateCategory() {
    const updatedBudgetAmount = (this.category.currentAllotment * 1000).toString();

    this.categoryUpdatorService.updateCategoryByMonth(this.category.budgetId, this.category.id, updatedBudgetAmount)
      .subscribe(() => {
        this.budgetValueDirty = false;
      },
      error => console.error('Error trying to update budget category value: ', error));
  }
}
