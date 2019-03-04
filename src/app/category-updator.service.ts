import { Injectable } from '@angular/core';
import { YnabApiService } from './ynab-api.service';
import { flatMap, filter } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { Category } from './category';
import { CategoryGroup } from './category-group';
import { Budget } from './budget';
import { AveragedCategoryGroup, AveragedCategory } from './averaged-category';

interface CurrentAndAggregateCategories {
  currentCategory: Category;
  categoryList: Category[];
  budgetId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryUpdatorService {

  constructor(private ynabApi: YnabApiService) { }

  getBudgetsWithAverages(): Observable<AveragedCategoryGroup[]> {
    const categoryGroups: Map<string, CategoryGroup> = new Map<string, CategoryGroup>();
    const categoryAggregates: Map<string, CurrentAndAggregateCategories> = new Map<string, CurrentAndAggregateCategories>();

    return new Observable(observer => {
      this.getBudgets().subscribe(
        budget => {
          this.getBudgetCategories(budget.id)
            .pipe(filter(category => !category.deleted && !category.hidden))
            .subscribe(categoryGroup => {
              categoryGroups.set(categoryGroup.id, categoryGroup);

              for (const category of categoryGroup.categories) {
                categoryAggregates.set(category.id, {
                  currentCategory: category,
                  categoryList: [ category ],
                  budgetId: budget.id,
                });
              }
            },
            error => console.error,
            () => {
              this.getPreviousMonthsCategories(budget.id).subscribe(category => {
                categoryAggregates.get(category.id).categoryList.push(category);
              },
              error => console.error,
              () => {
                const categoryGroupsOutput: AveragedCategoryGroup[] = [];

                // Iterate through every Category Group
                categoryGroups.forEach(categoryGroup => {
                  // Iterate through every Category
                  const averagedCategoryGroup = new AveragedCategoryGroup(categoryGroup);

                  for (const category of categoryGroup.categories) {
                    const averagedCategory = new AveragedCategory(category);
                    const currentAndAggregateCategories: CurrentAndAggregateCategories = categoryAggregates.get(category.id);
                    const aggregates = currentAndAggregateCategories.categoryList.filter(c => c.budgeted > 0);

                    const average = (aggregates
                      .map(c => c.budgeted)
                      .reduce((iterator, value) => iterator + value, 0)) / aggregates.length / 1000;

                    averagedCategory.budgetId = currentAndAggregateCategories.budgetId;
                    averagedCategory.currentBudgeted = currentAndAggregateCategories.currentCategory.budgeted;
                    averagedCategory.monthlyBudgeted = average > 0 ? average : 0;
                    averagedCategoryGroup.categories.push(averagedCategory);
                  }

                  categoryGroupsOutput.push(averagedCategoryGroup);
                });
                observer.next(categoryGroupsOutput);
              });
            });
        }
      );
    });
  }

  getBudgets(): Observable<Budget> {
    return this.ynabApi.getBudgets()
      .pipe(flatMap(budget => budget));
  }

  getBudgetCategories(budgetId): Observable<CategoryGroup> {
    return this.ynabApi.getCategories(budgetId)
      .pipe(flatMap(categoryGroup => categoryGroup));
  }

  getPreviousMonthsCategories(budgetId: string): Observable<Category> {
    const lastMonthsDateString = this.generateMonthString(1),
          monthBeforeLastDateString = this.generateMonthString(2);

    return new Observable(observer => {
      this.ynabApi.getCategoriesByMonth(budgetId, lastMonthsDateString)
              .subscribe(categories => {
                for (const category of categories) {
                  observer.next(category);
                }

                this.ynabApi.getCategoriesByMonth(budgetId, monthBeforeLastDateString)
                  .subscribe(latestMonthCategories => {
                    for (const category of latestMonthCategories) {
                      observer.next(category);
                    }

                    observer.complete();
                });
              });
    });

  }

  private generateMonthString(monthsAgo: number): string {
    const month = new Date();

    month.setMonth(month.getMonth() - monthsAgo);
    const monthDate = month.getMonth() + 1;
    const monthDateString = monthDate > 9 ? monthDate.toString() : '0' + monthDate.toString();
    return `${month.getFullYear()}-${monthDateString}-01`;
  }


  updateCategoryByMonth(budgetId: string, categoryId: string, budgetAmount: string): Observable<void> {
    const currenMonth = this.generateMonthString(0);

    return this.ynabApi.updateCategoryByMonth(budgetId, currenMonth, categoryId, budgetAmount);
  }
}
