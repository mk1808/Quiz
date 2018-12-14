import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TestService } from 'src/app/quiz/shared/services/test.service';
import { Subject } from 'src/app/quiz/shared/models/classes';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-resume-test',
  templateUrl: './resume-test.component.html',
  styleUrls: ['./resume-test.component.css']
})
export class ResumeTestComponent implements OnInit {

  constructor(  private cookie:CookieService,  private test:TestService, 
    private router:Router, private route:ActivatedRoute) { }
  idSubject:string;
  subject:Subject=new Subject();

  ngOnInit() {
    this.idSubject=this.cookie.get('idSubject');
    this.test.getQuizDetails(this.idSubject).subscribe(x=>{
      this.subject.name=x.NAME;
      this.subject.course=x.COURSE;
      this.subject.nOQuestions=x.N_O_QUESTIONS;
      this.subject.limitedTime=x.LIMITED_TIME;
      this.subject.multipleChoice=x.MULTIPLE_CHOICE;
      this.subject.description=x.DESCRIPTON;
      this.subject.time=x.TIME;
      console.log(this.subject.description);
    });
  }
  onEdit(){
    this.router.navigate(['../'], { relativeTo: this.route });

  }

  onMain(){
    this.router.navigate(['../'], { relativeTo: this.route });

  }

}
