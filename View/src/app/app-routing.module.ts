import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestViewComponent} from "./test-view/test-view.component";

const routes: Routes = [
  { path: 'test', component: TestViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
