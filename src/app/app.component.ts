import { Component } from '@angular/core';
import { CategoryUpdatorService } from './category-updator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  subdivision = 'weekly';

  constructor(private categoryUpdator: CategoryUpdatorService) {}

  getCategories() {
    this.categoryUpdator.getBudgetsWithAverages().subscribe(result => {
      console.log(result);
    });
  }
}
