import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './content/test/test.component';
import { TestBeginComponent } from './content/test/test-begin/test-begin.component';
import { TestEndComponent } from './content/test/test-end/test-end.component';
import { StudentMainPanelComponent } from './content/student-main-panel/student-main-panel.component';
import { ChooseDemoComponent } from './content/test/choose-demo/choose-demo.component';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'begin', component: TestBeginComponent },
  { path: 'end', component: TestEndComponent },
  { path: 'student_panel', component: StudentMainPanelComponent},
  { path: '', redirectTo: '/quiz/begin', pathMatch: 'full'},

  { path: 'demo',component: ChooseDemoComponent },
  
  { path: 'demo/:name/begin',component: TestBeginComponent },
  { path: 'demo/:name/test', component: TestComponent },
  { path: 'demo/:name/end', component: TestEndComponent },
  { path: '**', redirectTo: '/quiz/student_panel'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
