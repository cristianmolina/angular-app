import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { InformationCategoryComponent } from './information-category/information-category.component';
import { CategoryService } from './services/category.service';
import { AppRoutingModule } from './app-routing.module';
import { EscapeHtmlPipe } from './tools/escape-html.pipe';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CommentsComponent } from './comments/comments.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

/**
 * Modulo principal de la aplicaciòn.
 */
@NgModule({
  declarations: [
    AppComponent,
    EscapeHtmlPipe,
    CategoriesComponent,
    InformationCategoryComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PerfectScrollbarModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
