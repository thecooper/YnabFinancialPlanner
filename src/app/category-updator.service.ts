import { Injectable } from '@angular/core';
import { YnabApiService } from './ynab-api.service';
import { flatMap, take, map, filter } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { MeanBudget } from './mean-budget';
import { stringify } from '@angular/compiler/src/util';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryUpdatorService {

  constructor(private ynabApi: YnabApiService) { }

  getBudgetsWithAverages(): Observable<MeanBudget> {
    // tslint:disable-next-line:max-line-length
    const budgetsWithAverages: Map<string, { category: Category, values: number[] }> = new Map<string, { category: Category, values: number[] }>();

    return new Observable(observer => {
      this.getBudgetCategories()
        // .pipe(map(category => {}));
        .pipe(filter(category => !category.deleted && !category.hidden))
        .subscribe(category => {
          if (!budgetsWithAverages.has(category.id)) {
            budgetsWithAverages.set(category.id, {
              category: category,
              values: []
            });
          }
          budgetsWithAverages.get(category.id).values.push(category.activity / 100);
        },
        error => console.error,
        () => {
          // const categoryIds = budgetsWithAverages.keys();
          // console.log(budgetsWithAverages);
          console.log(budgetsWithAverages.entries());
          // let currentCategoryId = categoryIds.next();

          // while (!(currentCategoryId = categoryIds.next()).done) {
          //   console.log(budgetsWithAverages.get(currentCategoryId.value));
          // }

          budgetsWithAverages.forEach((data: { category: Category, values: number[] }, key: string) => {
            const averageSpent = data.values.reduce((previousVal, currentVal) => previousVal + currentVal) / data.values.length;
            const meanBudget = new MeanBudget();

            meanBudget.id = data.category.id;
            meanBudget.name = data.category.name;
            meanBudget.averageSpent = averageSpent;

            observer.next(meanBudget);
          });
        });
    });
  }

  getBudgetCategories(): Observable<Category> {
    // const budgetsWithAverages: Map<string, MeanBudget> = new Map<string, Map<string, Budget>>();

    const lastMonth = new Date(), monthBeforeLast = new Date();

    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthDate = lastMonth.getMonth() + 1;
    const lastMonthDateString = lastMonthDate > 9 ? lastMonthDate.toString() : '0' + lastMonthDate.toString();
    const lastMonthsDateString = `${lastMonth.getFullYear()}-${lastMonthDateString}-01`;

    monthBeforeLast.setMonth(monthBeforeLast.getMonth() - 2);
    const monthBeforeLastMonth = monthBeforeLast.getMonth() + 1;
    const monthBeforeLastMonthString = monthBeforeLastMonth > 9 ? monthBeforeLastMonth.toString() : '0' + monthBeforeLastMonth.toString();
    const monthBeforeLastDateString = `${monthBeforeLast.getFullYear()}-${monthBeforeLastMonthString}-01`;


    return new Observable(observer => {
      this.ynabApi.getBudgets()
        .pipe(
          flatMap(budget => budget),
          take(1)
        ).subscribe(budget => {
          this.ynabApi.getCategories(budget.id).subscribe(categoryGroups => {
            for (const categoryGroup of categoryGroups) {
              for (const category of categoryGroup.categories) {
                observer.next(category);
              }
            }

            this.ynabApi.getCategoriesByMonth(budget.id, lastMonthsDateString)
            .subscribe(categories => {
              for (const category of categories) {
                observer.next(category);
              }

              this.ynabApi.getCategoriesByMonth(budget.id, monthBeforeLastDateString)
                .subscribe(latestMonthCategories => {
                  for (const category of latestMonthCategories) {
                    observer.next(category);
                  }

                  observer.complete();
              });
            });
          });
        });
    });
  }

  updateBudgets() {

  }
}
