import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

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
    private auth:AuthService ) {}

  ngOnInit() {
  }
  
  onClick(){
    this.router.navigate(['../register'], { relativeTo: this.route });
  }

  onLogIn(){
    this.auth.logIn(this.userForm.controls.username.value, this.userForm.controls.password.value).subscribe
    (x=>console.log(x), e=>console.log(e));
  }
  
}
