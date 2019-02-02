import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-project';
  checked = false;
  indeterminate = false;
  public spinkit = Spinkit.skChasingDots; 
  
}
