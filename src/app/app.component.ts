import { Component } from '@angular/core';
import { CategoryUpdatorService } from './category-updator.service';
import { AveragedCategoryGroup, AveragedCategory } from './averaged-category';
import { Observable, of } from 'rxjs';
import { Subdivision } from './subdivision';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  averagedCategoryGroups$: Observable<AveragedCategoryGroup[]>;

  subdivision: Subdivision = 'weekly';

  constructor(private categoryUpdator: CategoryUpdatorService) {}

  getCategories() {
    // const averagedCategoryGroup = new AveragedCategoryGroup();
    // averagedCategoryGroup.name = 'Test Category Group';
    // averagedCategoryGroup.categories.push(new AveragedCategory());
    // averagedCategoryGroup.categories[0].monthlyBudgeted = 100;
    // averagedCategoryGroup.categories[0].name = 'Test Category';
    // averagedCategoryGroup.categories[0].currentBudgeted = 25;

    this.averagedCategoryGroups$ = this.categoryUpdator.getBudgetsWithAverages();
  }
}
