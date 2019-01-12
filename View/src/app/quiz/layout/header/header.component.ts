import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, RoutesRecognized} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mainPath="";
  logged:boolean = false;
  name:string ;
  collapsed:boolean=true;
  constructor(private cookie:CookieService,private router:Router, private route:ActivatedRoute) {
    this.router.events.subscribe(event => {
        //calls this stuff when navigation ends

      if (event instanceof RoutesRecognized)
        this.checkLogged();
    });
  }

  ngOnInit() {
    this.checkLogged();
  }

  checkLogged(){
    if(this.cookie.get('user')=="") {
      this.logged = false;
    }
    else {
      this.logged = true;
      this.name = JSON.parse(this.cookie.get('user')).name+" "+JSON.parse(this.cookie.get('user')).surname;
      if (JSON.parse(this.cookie.get('user')).role==1)
      {
        this.mainPath='/creating/teacher_panel';
      }
      else {
        this.mainPath='/quiz/student_panel';
      }
    }
  }

  wyloguj(){
    this.cookie.deleteAll('*');
	this.cookie.set('user','',-60,'/');
    this.router.navigate(['/login']);
  }

  onFullTest(){
    this.collapsed=!this.collapsed;
  }

  cancelCollapse(event){
    event.path[2].classList.remove('show');
  }

}
