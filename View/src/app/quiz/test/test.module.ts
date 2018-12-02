import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './content/test/test.component';
import { QuestionComponent } from './content/test/question/question.component';
import { TestBeginComponent } from './content/test/test-begin/test-begin.component';
import { TestEndComponent } from './content/test/test-end/test-end.component';
import { AnswerComponent } from './content/test/question/answer/answer.component';
import { TestRoutingModule } from './test-routing.module';
import { MatButtonModule, MatToolbarModule, MatCheckboxModule, MatMenuModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HighlightModule } from 'ngx-highlightjs';
import { TestListStudentComponent } from './content/test-list-student/test-list-student.component';



@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    HttpClientModule,
    ReactiveFormsModule,
    HighlightModule
  ],
  declarations: [
    TestComponent,  
    QuestionComponent,
    TestBeginComponent,
    TestEndComponent,
    AnswerComponent,
    TestListStudentComponent]
})
export class TestModule { }
