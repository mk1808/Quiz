import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'
import { MainPageComponent } from './main-page/main-page.component';
import { ContactComponent } from './contact/contact.component';
import { EditUserAccountComponent } from './auth/edit-user-account/edit-user-account.component';
import { UsersListComponent } from './auth/users-list/users-list.component';
import { EditUserByTeacherComponent } from './auth/edit-user-by-teacher/edit-user-by-teacher.component';
import { LogoutAlertComponent } from './auth/logout-alert/logout-alert.component';
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
      path: "logout",
      component: LogoutAlertComponent 
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
      path: "profile",
      component: EditUserAccountComponent 
    },
    {
      path: "usersList",
      component: UsersListComponent 
    },
    {
      path: "usersList/:id",
      component: EditUserByTeacherComponent 
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
