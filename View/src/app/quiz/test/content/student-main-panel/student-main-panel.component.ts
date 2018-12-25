import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/quiz/shared/models/classes';
import { AuthService } from 'src/app/quiz/shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-main-panel',
  templateUrl: './student-main-panel.component.html',
  styleUrls: ['./student-main-panel.component.css']
})
export class StudentMainPanelComponent implements OnInit {

  tests: Subject[] = [];
  course: string;
  constructor(private cookie: CookieService, private auth: AuthService,
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
        this.auth.getTestsByCourse(this.course).subscribe(x => {
          if (x.status == 200) {
            this.tests = x.body;
            console.log(this.tests);
          }
        })
      }
    }
  }
  onTest(id: string) {

    this.cookie.set("idSubject", id.toString(), null, "/");

    this.router.navigate(['../test_begin'], { relativeTo: this.route });

  }

}
