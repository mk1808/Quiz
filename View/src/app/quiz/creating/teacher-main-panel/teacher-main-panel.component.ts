import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../shared/services/auth.service';
import { Subject } from '../../shared/models/classes';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-teacher-main-panel',
  templateUrl: './teacher-main-panel.component.html',
  styleUrls: ['./teacher-main-panel.component.css']
})
export class TeacherMainPanelComponent implements OnInit {
  questions:string[]=[];
  tests:Subject[]=[];
  idUser:string;
  constructor(private cookie:CookieService, private auth:AuthService,
    private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.idUser=JSON.parse(this.cookie.get('user')).id;
    console.log(this.idUser);
    this.auth.getTests(this.idUser).subscribe(x =>{
      this.tests=x;
      console.log(this.tests); 
    })
  }
  
  onNew(){
    this.router.navigate(['../new_test'], { relativeTo: this.route });
  }
  onView(id:string){
    this.cookie.set("idSubject", id.toString());
    this.router.navigate(['../new_test/resume'], { relativeTo: this.route });
    
  }
}
