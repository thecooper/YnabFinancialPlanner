import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatRadioModule, MatButtonModule, MatInputModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { YnabBudgetComponent } from './ynab-budget/ynab-budget.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AveragedCategoryGroupComponent } from './averaged-category-group/averaged-category-group.component';
import { AveragedCategoryComponent } from './averaged-category/averaged-category.component';
import { FocusInputComponent } from './focus-input/focus-input.component';

const ANGULAR_MATERIAL_MODULES = [
  MatInputModule,
  MatListModule,
  MatRadioModule,
  MatButtonModule,
  BrowserAnimationsModule
];

@NgModule({
  declarations: [
    AppComponent,
    YnabBudgetComponent,
    AveragedCategoryGroupComponent,
    AveragedCategoryComponent,
    FocusInputComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    FormsModule,
    ...ANGULAR_MATERIAL_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
