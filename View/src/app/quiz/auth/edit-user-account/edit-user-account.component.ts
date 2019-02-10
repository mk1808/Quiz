import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../shared/services/auth.service';
import { TestService } from '../../shared/services/test.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-account',
  templateUrl: './edit-user-account.component.html',
  styleUrls: ['./edit-user-account.component.css']
})
export class EditUserAccountComponent implements OnInit {
idUser:string;
editUserForm: FormGroup = this.fb.group({
  course: ['', Validators.required],
  password: ['', Validators.required],
  passwordRepeat: ['', Validators.required],
  name: ['', Validators.required],
  surname: ['', Validators.required],
  email: ['', Validators.required]

}, { 
//  validator: this.formValidator
 }
);
  constructor(private fb: FormBuilder,private cookie: CookieService, private auth: AuthService,
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
        this.idUser = JSON.parse(this.cookie.get('user')).id;
        console.log(this.idUser);
  }
    }
  }
}
