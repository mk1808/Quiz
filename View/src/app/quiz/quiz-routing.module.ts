import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    path: "", component: LayoutComponent,children:[ {
      path: "quiz",
      loadChildren: "./test/test.module#TestModule"
    },
      {
      path: "creating",
      loadChildren: "./creating/creating.module#CreatingModule"
    },
    { path: '', redirectTo: '/quiz/begin', pathMatch: 'full'}, 
   ]
}

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
