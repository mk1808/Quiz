import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestViewComponent} from "./test-view/test-view.component";
import { TestComponent } from './content/test/test.component';
import { TestBeginComponent } from './content/test/test-begin/test-begin.component';
import { TestEndComponent } from './content/test/test-end/test-end.component';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'test2', component: TestViewComponent },
  { path: 'begin', component: TestBeginComponent },
  { path: 'end', component: TestEndComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
