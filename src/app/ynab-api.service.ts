import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, tap } from 'rxjs/operators';

import { Budget } from './budget';
import { CategoryGroup } from './category-group';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Category } from './category';

const YNAB_BASE_URL = 'https://api.youneedabudget.com/v1';

@Injectable({
  providedIn: 'root'
})
export class YnabApiService {

  private headers: any = {};

  constructor(private http: HttpClient) {
    this.headers['Authorization'] = `Bearer ${environment.pat}`;
  }

  getBudgets(): Observable<Budget[]> {
    return this.http.get(`${YNAB_BASE_URL}/budgets`, { headers: this.headers })
      .pipe(
        map((result: any) => result.data.budgets as Budget[])
      );
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
}
