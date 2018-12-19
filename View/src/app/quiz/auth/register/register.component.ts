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
  regSuccess:boolean=false;
  regFail:boolean=false;
  user:User=new User;  
  registerForm: FormGroup = this.fb.group({
    course: ['', Validators.required],
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
    this.regSuccess=false;
    this.regFail=false;
    this.user.email=  this.registerForm.controls.email.value;
    this.user.password =   this.registerForm.controls.password.value;
    this.user.course= this.registerForm.controls.course.value;
    this.user.name= this.registerForm.controls.name.value;
    this.user.surname= this.registerForm.controls.surname.value;

    this.auth.register(this.user).subscribe
    (x=>{console.log(x);
    this.regSuccess=true;}, 
    e=>{console.log(e);
    this.regFail=true;});
  }

}
