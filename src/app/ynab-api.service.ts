import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, tap, switchMap } from 'rxjs/operators';

import { Budget } from './budget';
import { CategoryGroup } from './category-group';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Category } from './category';
import * as ynab from 'ynab';

const YNAB_BASE_URL = 'https://api.youneedabudget.com/v1';

@Injectable({
  providedIn: 'root'
})
export class YnabApiService {

  private headers: any = {};
  private ynabAPI;

  constructor(private http: HttpClient) {
    this.headers['Authorization'] = `Bearer ${environment.pat}`;
    this.ynabAPI = new ynab.API(environment.pat);
  }

  getBudgets(): Observable<Budget[]> {
    return this.http.get(`${YNAB_BASE_URL}/budgets`, { headers: this.headers })
      .pipe(
        map((result: any) => result.data.budgets as Budget[])
      );
    // return this.ynabAPI.getBudgets();
  }

  getCategories(budgetId: string): Observable<CategoryGroup[]> {
    return this.http.get(`${YNAB_BASE_URL}/budgets/${budgetId}/categories`, { headers: this.headers })
      .pipe(
        map((result: any) => result.data.category_groups as CategoryGroup[])
      );
  }

  getCategoriesByMonth(budgetId: string, month: string): Observable<Category[]> {
    return this.http.get(`${YNAB_BASE_URL}/budgets/${budgetId}/months/${month}`, { headers: this.headers })
      .pipe(map((result: any) => result.data.month.categories as Category[]));
  }

  updateCategoryByMonth(budgetId: string, month: string, categoryId: string, budgetAmount: string): Observable<void> {
    // return this.http.options(`${YNAB_BASE_URL}/budgets/${budgetId}/months/${month}/categories/${categoryId}`, {
    //   headers: this.headers,
    // })
    //   .pipe(
    //     switchMap(x => this.http.patch(`${YNAB_BASE_URL}/budgets/${budgetId}/months/${month}/categories/${categoryId}`, {
    //     category: {
    //       budgeted: budgetAmount
    //     }
    //   }, {
    //     headers: this.headers,
    //   }).pipe(
    //     tap(a => console.log('Value returned from PATCH call to update budget category: ', x)),
    //     map(a => null)
    //   )));
    const data = {
      category: {
        budgeted: budgetAmount
      }
    };

    return this.http.patch(`${YNAB_BASE_URL}/budgets/${budgetId}/months/${month}/categories/${categoryId}`,
      data,
      { headers: this.headers, withCredentials: true }).pipe(
      tap(a => console.log('Value returned from PATCH call to update budget category: ', a)),
      map(a => null)
    );
  }
}
