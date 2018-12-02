import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatingRoutingModule } from './creating-routing.module';
import { NewTestComponent } from './new-test/new-test.component';
import { NewQuestionComponent } from './new-test/new-question/new-question.component';
import { ResumeTestComponent } from './new-test/resume-test/resume-test.component';
import { TestListComponent } from './test-list/test-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatToolbarModule, MatCheckboxModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    CreatingRoutingModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatToolbarModule, 
    MatCheckboxModule, 
    MatMenuModule,
    FlexLayoutModule
  ],
  declarations: [NewTestComponent, NewQuestionComponent, ResumeTestComponent, TestListComponent]
})
export class CreatingModule { }
