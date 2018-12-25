import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'src/app/quiz/shared/models/classes';
import { TestService } from 'src/app/quiz/shared/services/test.service';

@Component({
  selector: 'app-test-begin',
  templateUrl: './test-begin.component.html',
  styleUrls: ['./test-begin.component.css']
})
export class TestBeginComponent implements OnInit {
  idSubject: string;
  subject: Subject = new Subject();
  constructor(private router: Router, private route: ActivatedRoute,
    private cookie: CookieService, private test: TestService) {

  }

  ngOnInit() {
    if (this.cookie.get('user') == "") {
      this.router.navigate(['/']);
    }
    else {
      if (JSON.parse(this.cookie.get('user')).role == 1) {
        this.router.navigate(['/creating/teacher_panel']);
      }

      else {
        if (this.cookie.get('idSubject') == "") {
          this.router.navigate(['/quiz/student_panel']);
        }
        else {
          this.idSubject = this.cookie.get('idSubject');
          this.test.getQuizDetails(this.idSubject).subscribe(x => {
            if (x.status == 200) {
              x = x.body;
              console.log(x);
              this.subject.name = x.NAME;
              this.subject.course = x.COURSE;
              this.subject.nOQuestions = x.N_O_QUESTIONS;
              this.subject.limitedTime = x.LIMITED_TIME;
              this.subject.multipleChoice = x.MULTIPLE_CHOICE;
              this.subject.description = x.DESCRIPTION;
              this.subject.time = x.TIME;
              console.log("subj  ", this.subject);
              console.log("mult", this.subject.multipleChoice)
              this.cookie.set("multipleChoice", this.subject.multipleChoice.toString(), null, "/");

              this.cookie.set("time", JSON.stringify({ limitedTime: this.subject.limitedTime, time: this.subject.time }));
            }
          });
        }
      }
    }
  }
  
  onSubmit() {
    this.router.navigate(['../test'], { relativeTo: this.route });
  }
}
