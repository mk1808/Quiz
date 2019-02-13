import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TestService } from 'src/app/quiz/shared/services/test.service';
import { Subject } from 'src/app/quiz/shared/models/classes';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/quiz/shared/services/auth.service';


@Component({
  selector: 'app-resume-test',
  templateUrl: './resume-test.component.html',
  styleUrls: ['./resume-test.component.css']
})
export class ResumeTestComponent implements OnInit {

  constructor(private cookie: CookieService, private test: TestService,
    private router: Router,private auth: AuthService,  private route: ActivatedRoute) {
  }
  idSubject: string;
  subject: Subject = new Subject();

  ngOnInit() {
    window.scroll(0, 0);
    if (this.cookie.get('user') == "") {
      this.router.navigate(['/']);
    }
    else {
      if (JSON.parse(this.cookie.get('user')).role == 2) {
        this.router.navigate(['/quiz/student_panel']);
      }
      else {
        if (this.cookie.get('idSubject') == "") {
          this.router.navigate(['/creating/teacher_panel'])
        }
        else {
          this.idSubject = this.cookie.get('idSubject');
          this.test.getQuizDetails(this.idSubject).subscribe(x => {
        
            if(!isNaN(Number(x.course))){
              this.auth.getUserDetails(x.course).subscribe(y=>{
                x.course = y.email;
                this.subject = x;
                this.cookie.set("subject",JSON.stringify(this.subject),null,'/');
              })
            }else {

              this.subject = x;
              this.cookie.set("subject",JSON.stringify(this.subject),null,'/');
            }
           
          
            
          });
        }
      }
    }
  }

  onEdit() {
    this.router.navigate(['../' + this.idSubject], { relativeTo: this.route });

  }

  onMain() {
    this.router.navigate(['creating/teacher_panel']);

  }

}
