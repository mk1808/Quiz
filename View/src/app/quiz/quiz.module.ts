import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    QuizRoutingModule,
    HttpClientModule,
    MatButtonModule
  ],
  declarations: [LayoutComponent,HeaderComponent, FooterComponent]
})
export class QuizModule { }
