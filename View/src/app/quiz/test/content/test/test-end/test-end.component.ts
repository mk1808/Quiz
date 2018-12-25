import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/quiz/shared/services/test.service';
import { Result } from 'src/app/quiz/shared/models/classes';
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
  constructor(private testService: TestService, private router: Router,
    private route: ActivatedRoute, private cookie: CookieService) { }

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
          let result: Result = this.testService.getResult();
          this.total = result.total;
          if (this.total == null)
            this.router.navigate(['/begin']);
          this.trueAns = result.true;
          this.truePercent = Math.round(this.trueAns / this.total * 100);
          this.isPassed = this.truePercent >= 50;
          console.log("total:" + this.total + " true:" + this.trueAns + " procent:" + this.truePercent + " " + this.isPassed);
          console.log(this.testService.getResult());

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
}
