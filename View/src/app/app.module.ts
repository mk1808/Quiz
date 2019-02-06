import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule} from '@angular/material';
import {HttpClientModule} from "@angular/common/http";
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TestViewComponent } from './test-view/test-view.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxMaskModule } from 'ngx-mask';
import { CookieService } from 'ngx-cookie-service';
import { NgxGoogleMapModule } from 'ngx-google-map';
import { NgHttpLoaderModule } from 'ng-http-loader';


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    TestViewComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxGoogleMapModule,
    NgHttpLoaderModule.forRoot()
    
  
    
    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
