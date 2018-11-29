import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/classes';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    passwordRepeat: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required]

  });
  constructor(private fb: FormBuilder, private auth:AuthService) { }

  ngOnInit() {
  }

  onRegister(){
    this.auth.register(this.registerForm.controls.username.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.email.value, 
      this.registerForm.controls.name.value,
      this.registerForm.controls.surname.value
      ).subscribe
    (x=>console.log(x), e=>console.log(e));
  }

}
