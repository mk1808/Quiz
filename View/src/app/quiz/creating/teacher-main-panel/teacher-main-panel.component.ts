import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../shared/services/auth.service';
import { Subject } from '../../shared/models/classes';

@Component({
  selector: 'app-teacher-main-panel',
  templateUrl: './teacher-main-panel.component.html',
  styleUrls: ['./teacher-main-panel.component.css']
})
export class TeacherMainPanelComponent implements OnInit {
  questions:string[]=[];
  tests:Subject[]=[];
  idUser:string;
  constructor(private cookie:CookieService, private auth:AuthService) { }

  ngOnInit() {
    this.idUser=JSON.parse(this.cookie.get('user')).id;
    console.log(this.idUser);
    this.auth.getTests(this.idUser).subscribe(x =>{
      this.tests=x;
      console.log(this.tests);
      
      
    })


  }
  collapse(i){
    if(document.getElementById('question'+i).classList.contains("quizShow")){
      document.getElementById('question'+i).classList.remove('quizShow');
    }
    else {
      document.getElementById('question'+i).classList.add('quizShow');
    }
  }
}
