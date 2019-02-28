import { Category } from './category';

export class CategoryGroup {
  id: string;
  name: string;
  hidden: boolean;
  deleted: boolean;
  categories: Category[];
}
