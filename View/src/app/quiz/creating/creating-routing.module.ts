import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTestComponent } from './new-test/new-test.component';
import { NewQuestionComponent } from './new-test/new-question/new-question.component';
import { ResumeTestComponent } from './new-test/resume-test/resume-test.component';
import { TeacherMainPanelComponent } from './teacher-main-panel/teacher-main-panel.component';


const routes: Routes = [
  { path: 'new_test', component: NewTestComponent},
  { path: 'new_test/new_question', component: NewQuestionComponent},
  { path: 'new_test/edit_question/:id', component: NewQuestionComponent},
  { path: 'new_test/resume', component: ResumeTestComponent},
  { path: 'new_test/:id', component: NewTestComponent},
  { path: 'teacher_panel', component: TeacherMainPanelComponent},
  { path: '', redirectTo: '/creating/new_test', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatingRoutingModule { }
