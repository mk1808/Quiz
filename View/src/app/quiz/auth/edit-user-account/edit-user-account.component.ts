import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../shared/services/auth.service';
import { TestService } from '../../shared/services/test.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../shared/models/classes';

@Component({
  selector: 'app-edit-user-account',
  templateUrl: './edit-user-account.component.html',
  styleUrls: ['./edit-user-account.component.css']
})
export class EditUserAccountComponent implements OnInit {
idUser:string;
currentUser:User = new User();
user:User = new User();
editUserForm: FormGroup;
editSuccess:boolean= false;
editFail:boolean= false;
editSuccessS:string;

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
        this.currentUser=JSON.parse(this.cookie.get('user'));
        this.editSuccessS=this.cookie.get('edit');
        this.editSuccess=this.editSuccessS=="true";
        this.cookie.set("edit", "", -0.5, "/");

        console.log(this.idUser);
        this.editUserForm = this.fb.group({
          course: [this.currentUser.course, Validators.required],
          password: [''],
          passwordRepeat: [''],
          name: [this.currentUser.name, Validators.required],
          surname: [this.currentUser.surname, Validators.required],
          email: [{value:this.currentUser.email, disabled:true}]
        
        }, { 
          validator: this.formValidator
         }
        );
  }
    }
  }

  formValidator(group: FormGroup) {
    let correct = true;
    
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
    
    if (group.controls.course.value == "") {
      correct = false;
      group.controls.course.setErrors({ 'invalid': true });
    }


    return correct ? null : true;
  }

  onEdit() {
    if (this.editUserForm.valid) {
    this.editSuccess = false;
      this.editFail = false;
      this.user.id=Number(this.idUser);
      this.user.email = this.editUserForm.controls.email.value;
      this.user.password = this.editUserForm.controls.password.value;
      this.user.c_password = this.editUserForm.controls.passwordRepeat.value;
      this.user.course = this.editUserForm.controls.course.value;
      this.user.name = this.editUserForm.controls.name.value;
      this.user.surname = this.editUserForm.controls.surname.value;

      this.auth.updateUserBySelf(this.user).subscribe(x => {
          
      
         this.cookie.set("token", x.token, 0.5, "/");
         this.cookie.set("user", JSON.stringify(x.user), null, "/");
          console.log(x);
          this.editSuccess = true;
          this.cookie.set("edit", this.editSuccess.toString(), 0.001, "/");
          window.location.reload();  
           
        },
          e => {
          this.editFail=true;
            //console.log(e);
          });
   
        } else {
      this.editUserForm.controls['email'].markAsTouched();
      this.editUserForm.controls['name'].markAsTouched();
      this.editUserForm.controls['surname'].markAsTouched();
      this.editUserForm.controls['course'].markAsTouched();
      this.editUserForm.controls['password'].markAsTouched();
      this.editUserForm.controls['passwordRepeat'].markAsTouched();
    }

  }


}
