import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/quiz/shared/services/test.service';
import { Result, Question, QuestionStatus } from 'src/app/quiz/shared/models/classes';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-test-end',
  templateUrl: './test-end.component.html',
  styleUrls: ['./test-end.component.css']
})
export class TestEndComponent implements OnInit {
  total: number;
  trueAns: number;
  isPassed: boolean;
  truePercent: number;
  marks: number[] = [2,2,3,3,3.5,3.5,4,4,4.5,4.5,5,5];
  questions: QuestionStatus[];
  mark:number;
  constructor(private testService: TestService, private router: Router,
    private route: ActivatedRoute, private cookie: CookieService) { }

  ngOnInit() {
    if (this.cookie.get('user') == "") {
      if (window.location.href.split('/')[4] == 'demo') {
        let result: Result = this.testService.getResult();
        //////dodac
        this.total = result.total;
        if (this.total == null)
          this.router.navigate(['/']);
        this.trueAns = result.true;
        this.truePercent = Math.round(this.trueAns / this.total * 100);
        this.isPassed = this.truePercent >= 50;
        this.questions = this.testService.getQuestionsInResult();

      }
      else { this.router.navigate(['/']); }

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
          this.questions = this.testService.getQuestionsInResult();
          let result: Result = this.testService.getResult();
          let markTable: number[] = this.testService.getMarkTable();
          this.total = result.total;
          if (this.total == null)
            this.router.navigate(['/quiz/begin']);
          this.trueAns = result.true;
          this.truePercent = Math.round(this.trueAns / this.total * 100);
          this.isPassed = this.truePercent >= 60;

          let j: number;
          console.log(markTable); 
             
          for (let i = markTable.length-1; i > -1; i--) {
       
            if (this.trueAns >= markTable[i]) {
              j=i;
              break;


            }

          }
          this.mark=this.marks[j];
          
          console.log(this.mark);
        }
      }
    }
  }
  onSubmit() {

    this.router.navigate(['../begin'], { relativeTo: this.route });

  };
  onBack() {

    this.router.navigate(['../student_panel'], { relativeTo: this.route });

  };

  scrollTop() {
    window.scroll(0, 0);
  }
}
