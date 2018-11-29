import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTestComponent } from './new-test/new-test.component';
import { NewQuestionComponent } from './new-test/new-question/new-question.component';
import { ResumeTestComponent } from './new-test/resume-test/resume-test.component';
import { TestListComponent } from './test-list/test-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NewTestComponent, NewQuestionComponent, ResumeTestComponent, TestListComponent]
})
export class CreatingModule { }
