import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    QuizRoutingModule,
    HttpClientModule
  ],
  declarations: [LayoutComponent,HeaderComponent]
})
export class QuizModule { }
