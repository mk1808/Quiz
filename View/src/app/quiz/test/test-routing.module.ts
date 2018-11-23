import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './content/test/test.component';
import { TestBeginComponent } from './content/test/test-begin/test-begin.component';
import { TestEndComponent } from './content/test/test-end/test-end.component';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'begin', component: TestBeginComponent },
  { path: 'end', component: TestEndComponent },
  { path: '', redirectTo: '/quiz/begin', pathMatch: 'full'},
  { path: '**', redirectTo: '/quiz/begin'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
