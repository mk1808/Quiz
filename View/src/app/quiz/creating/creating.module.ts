import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatingRoutingModule } from './creating-routing.module';
import { NewTestComponent } from './new-test/new-test.component';
import { NewQuestionComponent } from './new-test/new-question/new-question.component';
import { ResumeTestComponent } from './new-test/resume-test/resume-test.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatButtonModule, MatToolbarModule, MatCheckboxModule, MatMenuModule, MatRadioButton, MatRadioModule,
  MatSlideToggleModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';
import { QuestionListComponent } from './new-test/new-question/question-list/question-list.component';
import { TeacherMainPanelComponent } from './teacher-main-panel/teacher-main-panel.component';
import { ModalModule } from 'ngx-bootstrap';
import { FileDropModule } from 'ngx-file-drop';
import { TestViewComponent } from 'src/app/test-view/test-view.component';


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
    FormsModule,
    MatRadioModule,
    MatSlideToggleModule,
    ModalModule,
    FileDropModule
  ],
  declarations: [NewTestComponent,
    NewQuestionComponent,
    ResumeTestComponent,
    QuestionListComponent,
    TeacherMainPanelComponent,
    TestViewComponent]
})
export class CreatingModule { }
