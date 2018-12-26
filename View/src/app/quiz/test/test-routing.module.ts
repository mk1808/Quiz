import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './content/test/test.component';
import { TestBeginComponent } from './content/test/test-begin/test-begin.component';
import { TestEndComponent } from './content/test/test-end/test-end.component';
import { StudentMainPanelComponent } from './content/student-main-panel/student-main-panel.component';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'begin', component: TestBeginComponent },
  { path: 'end', component: TestEndComponent },
  { path: 'student_panel', component: StudentMainPanelComponent},
  { path: '', redirectTo: '/quiz/begin', pathMatch: 'full'},

  { path: 'demo/begin',component: TestBeginComponent },
  { path: 'demo/test', component: TestComponent },
  { path: 'demo/end', component: TestEndComponent },
  { path: '**', redirectTo: '/quiz/begin'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
