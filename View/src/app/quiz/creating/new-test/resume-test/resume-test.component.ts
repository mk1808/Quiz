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

  constructor(private cookie: CookieService, private test: TestService,
    private router: Router, private route: ActivatedRoute) {
  }
  idSubject: string;
  subject: Subject = new Subject();

  ngOnInit() {
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
            if (x.status == 200) {
              x = x.body;
              this.subject.name = x.NAME;
              this.subject.course = x.COURSE;
              this.subject.nOQuestions = x.N_O_QUESTIONS;
              this.subject.limitedTime = x.LIMITED_TIME=='1';
              this.subject.multipleChoice = x.MULTIPLE_CHOICE=='1';
              this.subject.description = x.DESCRIPTION;
              this.subject.time = x.TIME;
              this.subject.separatePage=x.SEPARATE_PAGE=='1';
              this.subject.canBack=x.CAN_BACK;
              console.log(this.subject.description);
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
    this.router.navigate(['../../teacher_panel'], { relativeTo: this.route });

  }

}
