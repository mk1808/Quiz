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

  }, { validator: this.formValidator }
  );
  constructor(private fb: FormBuilder, private auth: AuthService, private cookie: CookieService,
    private router: Router, private route: ActivatedRoute) { }

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

  formValidator(group: FormGroup) {
    let correct = true;
    if (group.controls.password.value == "") {
      correct = false;
      group.controls.password.setErrors({ 'invalid': true });
    }
    if (group.controls.password.value != group.controls.passwordRepeat.value) {
      correct = false;
      group.controls.passwordRepeat.setErrors({ 'invalid': true });
    }
    if (group.controls.name.value == "") {
      correct = false;
      group.controls.name.setErrors({ 'invalid': true });
    }
    if (group.controls.surname.value == "") {
      correct = false;
      group.controls.surname.setErrors({ 'invalid': true });
    }
    if (group.controls.email.value == "") {
      correct = false;
      group.controls.email.setErrors({ 'invalid': true });
    } else {

      if (group.controls.email.value.split('@').length == 2) {

        if (group.controls.email.value.split('@')[1].includes('.')) {
          let length = group.controls.email.value.split('@')[1].split('.').length;
        for (let i = 0; i < length; i++) {
            if (group.controls.email.value.split('@')[1].split('.')[i].length >=1) {
            } else {
              correct = false; group.controls.email.setErrors({ 'invalid': true });
            break;
            }
          }


        } else { correct = false; group.controls.email.setErrors({ 'invalid': true }); }
      } else { correct = false; group.controls.email.setErrors({ 'invalid': true }); }
    }
    if (group.controls.course.value == "") {
      correct = false;
      group.controls.course.setErrors({ 'invalid': true });
    }


    return correct ? null : true;
  }

  onClear() {
    this.registerForm.controls.email.setValue('');
    this.registerForm.controls.name.setValue('');
    this.registerForm.controls.surname.setValue('');
    this.registerForm.controls.course.setValue('');
    this.registerForm.controls.password.setValue('');
    this.registerForm.controls.passwordRepeat.setValue('');
 
    this.registerForm.controls['email'].markAsUntouched();
    this.registerForm.controls['name'].markAsUntouched();
    this.registerForm.controls['surname'].markAsUntouched();
    this.registerForm.controls['course'].markAsUntouched();
    this.registerForm.controls['password'].markAsUntouched();
    this.registerForm.controls['passwordRepeat'].markAsUntouched();
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.regSuccess = false;
      this.regFail = false;
      this.user.email = this.registerForm.controls.email.value;
      this.user.password = this.registerForm.controls.password.value;
      this.user.c_password = this.registerForm.controls.passwordRepeat.value;
      this.user.course = this.registerForm.controls.course.value;
      this.user.name = this.registerForm.controls.name.value;
      this.user.surname = this.registerForm.controls.surname.value;

      this.auth.register(this.user).subscribe
        (x => {
          this.regSuccess = true;
          this.onClear();

        },
          e => {
          
          this.regFail=true;  
          });
   
        } else {
      this.registerForm.controls['email'].markAsTouched();
      this.registerForm.controls['name'].markAsTouched();
      this.registerForm.controls['surname'].markAsTouched();
      this.registerForm.controls['course'].markAsTouched();
      this.registerForm.controls['password'].markAsTouched();
      this.registerForm.controls['passwordRepeat'].markAsTouched();
    }

  }

  login() {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

}
