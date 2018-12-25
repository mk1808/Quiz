import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/classes';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regSuccess: boolean = false;
  regFail: boolean = false;
  user: User = new User;
  registerForm: FormGroup = this.fb.group({
    course: ['', Validators.required],
    password: ['', Validators.required],
    passwordRepeat: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required]

  });
  constructor(private fb: FormBuilder, private auth: AuthService,private cookie: CookieService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.cookie.get('user')=="") {

    }
    else {
      if (JSON.parse(this.cookie.get('user')).role==1)
      {
        this.router.navigate(['../creating/teacher_panel'], { relativeTo: this.route });}
      else {
        this.router.navigate(['../quiz/student_panel'], { relativeTo: this.route });
      }
    }
  }

  onClear() {
    this.registerForm.controls.email.setValue('');
    this.registerForm.controls.name.setValue('');
    this.registerForm.controls.surname.setValue('');
    this.registerForm.controls.course.setValue('');
    this.registerForm.controls.password.setValue('');
    this.registerForm.controls.passwordRepeat.setValue('');
  }

  onRegister() {
    this.regSuccess = false;
    this.regFail = false;
    this.user.email = this.registerForm.controls.email.value;
    this.user.password = this.registerForm.controls.password.value;
    this.user.course = this.registerForm.controls.course.value;
    this.user.name = this.registerForm.controls.name.value;
    this.user.surname = this.registerForm.controls.surname.value;

    this.auth.register(this.user).subscribe
      (x => {
        if (x.status == 200) {
          console.log(x);
          this.regSuccess = true;
          this.onClear();
        }
        else {
          this.regFail = true;
        }
      },
        e => {
          console.log(e);
        });
  }

}
