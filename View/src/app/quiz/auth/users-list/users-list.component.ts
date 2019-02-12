import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/classes';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users:Observable<User[]>;
  searchForm:FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private cookie:CookieService, private router:Router) { }

  ngOnInit() {
    if (this.cookie.get('user') == "") {
      this.router.navigate(['/']);
    }
    else {
      if (JSON.parse(this.cookie.get('user')).role == 2) {
        this.router.navigate(['/quiz/student_panel']);
      }
      else {

    this.searchForm = this.fb.group({
      email:[''],
      name:[''],
      surname:[''],
      course:['']
    })
    this.searchForm.valueChanges.subscribe(x=>{
       this.users=this.authService.getUserList(this.searchForm.controls.email.value,
        this.searchForm.controls.course.value,
        this.searchForm.controls.name.value,
        this.searchForm.controls.surname.value);
    })
    this.users=this.authService.getUserList('','','','');
  }
}
  }

  onClick(user){
    console.log(user);
  }

}
