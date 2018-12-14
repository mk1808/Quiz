import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import * as jwt_decode from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';

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
  constructor(private router:Router, private route:ActivatedRoute,private fb: FormBuilder,
    private auth:AuthService, private cookie:CookieService ) {}

  ngOnInit() {
  }
  
  onClick(){
    this.router.navigate(['../register'], { relativeTo: this.route });
  }

  onLogIn(){
    this.auth.logIn(this.userForm.controls.username.value, this.userForm.controls.password.value).subscribe
    (x=>{console.log(x);
    console.log(jwt_decode(x.jwt).data);
    this.cookie.set("jwt", x.jwt, 0.5);
    this.cookie.set("user",JSON.stringify(jwt_decode(x.jwt).data));

    }, e=>console.log(e));

  }
  
}
