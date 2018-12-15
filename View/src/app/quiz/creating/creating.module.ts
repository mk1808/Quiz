import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatingRoutingModule } from './creating-routing.module';
import { NewTestComponent } from './new-test/new-test.component';
import { NewQuestionComponent } from './new-test/new-question/new-question.component';
import { ResumeTestComponent } from './new-test/resume-test/resume-test.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatToolbarModule, MatCheckboxModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';
import { QuestionListComponent } from './new-test/new-question/question-list/question-list.component';
import { TeacherMainPanelComponent } from './teacher-main-panel/teacher-main-panel.component';


@NgModule({
  imports: [
    CommonModule,
    CreatingRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatMenuModule,
    FlexLayoutModule,
    NgxMaskModule.forChild(),
    MatCheckboxModule,
    FormsModule

  ],
  declarations: [NewTestComponent, 
    NewQuestionComponent, 
    ResumeTestComponent, 
    QuestionListComponent, 
    TeacherMainPanelComponent]
})
export class CreatingModule { }
