import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatRadioModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { YnabBudgetComponent } from './ynab-budget/ynab-budget.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    YnabBudgetComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    MatRadioModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
