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
  mark: number[] = [0, 59, 60, 64, 65, 74, 75, 84, 85, 94, 95, 100];
  markNumber: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  demoTest: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute,
    private cookie: CookieService, private test: TestService) {

  }

  ngOnInit() {

    if (this.cookie.get('user') == "") {

      if (window.location.href.split('/')[4] == 'demo') {
        this.demoTest = true;
        this.route.params.subscribe(x => {
          //console.log(x['name']);
         
          this.test.getDemoId(x['name']).subscribe(x => {
            //console.log(x);
            this.cookie.set("idSubject", x.id, null, '/');
            this.loadQuiz(x);
          });
        });

      }
      else {
        this.router.navigate(['/']);
      }


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
          this.test.getQuizDetails(this.idSubject).subscribe(x =>
            this.loadQuiz(x));
        }
      }
    }
  }

  private loadQuiz(x) {

    this.subject.name = x.name;
    this.subject.course = x.course;
    this.subject.nOQuestions = x.noQuestions;
    this.subject.multipleChoice = x.multipleChoice;
    this.subject.description = x.description;

    this.subject.limitedTime = x.limitedTime;
    //this.subject.time = x.time;
    if (this.demoTest) {
      this.subject.limitedTime = true;
      //console.log(x);
      if ((x.time == null)||(x.time <1)) {
        this.subject.time = 60;
      }else {
        this.subject.time=x.time;
      }


    }else {
   
      this.subject.time=x.time;

    }


    this.subject.separatePage = x.separatePage;
    this.subject.canBack = x.canBack;
    this.subject.randomize = (x.randomize == '1');
    this.subject.subject = (x.subject == "java" ? "Programowanie w języku Java" : "Technologie sieci WEB");
    let i = 0;
    let last: number;
    for (i = 0; i < this.mark.length; i = i + 2) {

      last = Math.ceil(this.subject.nOQuestions * 0.01 * this.mark[i]);
      this.markNumber[i] = last;
    }
    for (i = 1; i < this.mark.length - 1; i = i + 2) {

      this.markNumber[i] = this.markNumber[i + 1] - 1;
    }
    this.markNumber[11] = +this.subject.nOQuestions;

    //console.log(this.markNumber);
  //  this.test.setMarkTable(this.markNumber);
    this.cookie.set("markTable", JSON.stringify(this.markNumber), null, "/");
    
  this.cookie.set("multipleChoice", this.subject.multipleChoice.toString(), null, "/");

    this.cookie.set("time", JSON.stringify({ limitedTime: this.subject.limitedTime, time: this.subject.time }), null, "/");
    this.cookie.set("subj", JSON.stringify(this.subject), null, "/");

  }

  onSubmit() {
    this.router.navigate(['../test'], { relativeTo: this.route });
  }
}
