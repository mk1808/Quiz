import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'
import { MainPageComponent } from './main-page/main-page.component';
import { ContactComponent } from './contact/contact.component';
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
    {
      path: "login",
      component: LoginComponent 
    },
    {
      path: "register",
      component: RegisterComponent 
    },
    {
      path: "main",
      component: MainPageComponent 
    },
    {
      path: "contact",
      component: ContactComponent 
    },
    {
      path:"**", redirectTo: 'main'

    }

  //  { path: '', redirectTo: '/quiz/begin', pathMatch: 'full'}, 
   ]
}

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
