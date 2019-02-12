import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MainPageComponent } from './main-page/main-page.component';
import { ContactComponent } from './contact/contact.component';
import { NgxGoogleMapModule } from 'ngx-google-map';
import { ParallaxModule } from 'ngx-parallax';
import { EditUserAccountComponent } from './auth/edit-user-account/edit-user-account.component';
import { UsersListComponent } from './auth/users-list/users-list.component';


@NgModule({
  imports: [
    CommonModule,
    QuizRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxGoogleMapModule,
    ParallaxModule



  ],
  declarations: [LayoutComponent,HeaderComponent, FooterComponent, 
    LoginComponent, RegisterComponent, MainPageComponent, ContactComponent,
     EditUserAccountComponent,
     UsersListComponent]
})
export class QuizModule { }
