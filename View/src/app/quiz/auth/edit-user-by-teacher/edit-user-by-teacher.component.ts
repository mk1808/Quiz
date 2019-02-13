import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../shared/services/auth.service';
import { TestService } from '../../shared/services/test.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/classes';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CreatingService } from '../../shared/services/creating.service';

@Component({
  selector: 'app-edit-user-by-teacher',
  templateUrl: './edit-user-by-teacher.component.html',
  styleUrls: ['./edit-user-by-teacher.component.css']
})
export class EditUserByTeacherComponent implements OnInit {
  editUserForm: FormGroup;
  currentUser: User = new User();
  user: User = new User();
  initialized:boolean=false;
  roles:string[]=["Nauczyciel","Student"];
  editSuccess: boolean = false;
  editFail: boolean = false;
  modalRef: BsModalRef;
  constructor(private fb: FormBuilder, private cookie: CookieService, private auth: AuthService,
    private test: TestService, private creating:CreatingService,
    private router: Router, private route: ActivatedRoute, private modalService: BsModalService) { }

  ngOnInit() {
    if (this.cookie.get('user') == "") {
      this.router.navigate(['/']);
    }
    else {
      if (JSON.parse(this.cookie.get('user')).role == 2) {
        this.router.navigate(['/quiz/student_panel']);
      }

      else {
        this.route.params.subscribe(x => {
          let id = x['id'];
        
          this.auth.getUserDetails(id).subscribe(y => {
         
            this.currentUser = y;
          
            this.editUserForm = this.fb.group({
              course: [this.currentUser.course, Validators.required],
              name: [this.currentUser.name, Validators.required],
              surname: [this.currentUser.surname, Validators.required],
              role: [this.currentUser.role=='n'?this.roles[0]:this.roles[1], Validators.required],
              email: [{ value: this.currentUser.email, disabled: true }]

            },
              {
                validator: this.formValidator
              })
              this.initialized=true;
          }
          );
          

        }
        );
      }
    }
  }

  formValidator(group: FormGroup) {
    let correct = true;
    
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
    if (group.controls.role.value == "Rodzaj konta") {
      correct = false;
      group.controls.role.setErrors({ 'invalid': true });
    }

    return correct ? null : true;
  }

  onEdit(){
    if (this.editUserForm.valid) {
      this.editSuccess = false;
      this.editFail = false;
      this.user.id = Number(this.currentUser.id);
      this.user.email = this.editUserForm.controls.email.value;
      this.user.course = this.editUserForm.controls.course.value;
      this.user.name = this.editUserForm.controls.name.value;
      this.user.surname = this.editUserForm.controls.surname.value;
      this.user.role=this.editUserForm.controls.role.value=="Nauczyciel"?"n":"s";
      
      this.auth.updateUserByTeacher(this.user).subscribe(x=>
        {
          this.editSuccess=true;

        }),(e=>{
          this.editFail=true;
        })


  }
}
openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}
onDelet(){

  this.auth.deleteUser(Number(this.currentUser.id)).subscribe(x=>{

    if (x){
      this.router.navigate(['/usersList']);
    }
  });
  this.modalRef.hide();
}

onCancel(){
  this.modalRef.hide();
}

/*
onDelete(){

  this.auth.deleteUser(Number(this.currentUser.id)).subscribe(x=>
    {
      console.log(x);
    })
}*/
}
