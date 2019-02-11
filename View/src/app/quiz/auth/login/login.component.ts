import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import * as jwt_decode from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../shared/models/classes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
    private auth: AuthService, private cookie: CookieService) {
  }
  role: number;
  regFail: boolean = false;

  ngOnInit() {
    if (this.cookie.get('user') == "") {

    }
    else {
      if (JSON.parse(this.cookie.get('user')).role == 1) {
        this.router.navigate(['../creating/teacher_panel'], { relativeTo: this.route });
      }
      else {
        this.router.navigate(['../quiz/student_panel'], { relativeTo: this.route });
      }
    }
  }

  onRegister() {
    this.router.navigate(['../register'], { relativeTo: this.route });
  }

  onLogIn() {
    if (this.userForm.valid) {
      let user: User = new User;
      user.email = this.userForm.controls.username.value;

      user.password = this.userForm.controls.password.value;
      this.auth.logIn(user).subscribe
        (x => {
          this.role = (x.user.role=='s'?2:1);
          this.cookie.set("token", x.token, 0.5, "/");
          x.user.role=this.role;
          this.cookie.set("user", JSON.stringify(x.user), null, "/");
         // console.log(x);
          if (this.role == 1) {
            this.router.navigate(['creating/teacher_panel']);
          }
          else {
            this.router.navigate(['quiz/student_panel']);
          }
        }, e => {
          //console.log(e); this.regFail = true;
          this.userForm.controls.username.setValue("");
          this.userForm.controls.password.setValue("");
        });
    } else {
      this.userForm.controls.username.markAsTouched();

      this.userForm.controls.password.markAsTouched();
    }
  }
}
