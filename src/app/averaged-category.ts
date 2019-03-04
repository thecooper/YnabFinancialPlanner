import { CategoryGroup } from './category-group';
import { Category } from './category';

export class AveragedCategory {
  name: string;
  id: string;
  budgetId: string;

  currentBudgeted: number;
  monthlyBudgeted: number;
  currentAllotment: number;

  constructor(category?: Category) {
    this.name = (category && category.name) || '';
    this.id = (category && category.id) || null;
    this.currentBudgeted = 0;
    this.monthlyBudgeted = 0;
    this.currentAllotment = 0;
  }
}

export class AveragedCategoryGroup {
  name: string;
  categories: AveragedCategory[];

  constructor(categoryGroup?: CategoryGroup) {
    this.name = (categoryGroup && categoryGroup.name) || '';
    this.categories = [];
  }
}
