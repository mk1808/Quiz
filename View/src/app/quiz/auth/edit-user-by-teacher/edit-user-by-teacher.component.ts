import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../shared/services/auth.service';
import { TestService } from '../../shared/services/test.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/classes';

@Component({
  selector: 'app-edit-user-by-teacher',
  templateUrl: './edit-user-by-teacher.component.html',
  styleUrls: ['./edit-user-by-teacher.component.css']
})
export class EditUserByTeacherComponent implements OnInit {
  editUserForm: FormGroup;
  currentUser: User = new User();
  initialized:boolean=false;
  constructor(private fb: FormBuilder, private cookie: CookieService, private auth: AuthService,
    private test: TestService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.cookie.get('user') == "") {
      this.router.navigate(['/']);
    }
    else {
      if (JSON.parse(this.cookie.get('user')).role == 2) {
        this.router.navigate(['/quiz/student_panel']);
      }

      else {
        this.route.params.subscribe(x => {
          let id = x['id'];
          console.log('chudzcowe cukierki',id);
          this.auth.getUserDetails(id).subscribe(y => {
            console.log(y);
            this.currentUser = y;
            this.editUserForm = this.fb.group({
              course: [this.currentUser.course, Validators.required],
              name: [this.currentUser.name, Validators.required],
              surname: [this.currentUser.surname, Validators.required],
              role: [this.currentUser.role, Validators.required],
              email: [{ value: this.currentUser.email, disabled: true }]

            },
              {
                validator: this.formValidator
              })
              this.initialized=true;
          }
          );

        }
        );
      }
    }
  }

  formValidator(group: FormGroup) {
    let correct = true;
  }
}
