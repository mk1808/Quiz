import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/quiz/shared/models/classes';
import { AuthService } from 'src/app/quiz/shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/quiz/shared/services/test.service';

@Component({
  selector: 'app-student-main-panel',
  templateUrl: './student-main-panel.component.html',
  styleUrls: ['./student-main-panel.component.css']
})
export class StudentMainPanelComponent implements OnInit {

  tests: Subject[] = [];
  course: string;
  constructor(private cookie: CookieService, private auth: AuthService,
    private test: TestService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.cookie.get('user') == "") {
      this.router.navigate(['/']);
    }
    else {
      if (JSON.parse(this.cookie.get('user')).role == 1) {
        this.router.navigate(['/creating/teacher_panel']);
      }

      else {
        this.course = JSON.parse(this.cookie.get('user')).course;
        this.test.getTestsByCourse(this.course).subscribe(x => {
          
            this.tests = x;
          
        })
      }
    }
  }
  onTest(id: string) {

    this.cookie.set("idSubject", id.toString(), null, "/");

    this.router.navigate(['quiz/begin']);

  }

}
