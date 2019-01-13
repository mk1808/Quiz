import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor( private cookie: CookieService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.cookie.get('user')=="") {

    }
    else {
      if (JSON.parse(this.cookie.get('user')).role==1)
      {
        this.router.navigate(['quiz/creating/teacher_panel']);}
      else {
        this.router.navigate(['/quiz/student_panel']);
      }
    }
  }
  
  onDemo(){
    this.router.navigate(['/quiz/demo/begin']);

  }

  onLog(){
    this.router.navigate(['/login']);

  }

  onReg(){
    this.router.navigate(['/register']);

  }
}
