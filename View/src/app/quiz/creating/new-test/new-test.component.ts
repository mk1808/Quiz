import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subject, Cours, User } from '../../shared/models/classes';
import { DictionaryService } from '../../shared/services/dictionary.service';
import { CreatingService } from '../../shared/services/creating.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from '../../shared/services/test.service';


@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css']
})
export class NewTestComponent implements OnInit {
  limitedTime: boolean = false;
  coursesTable: Cours[] = [];
  multipleChoiceTable: string[] = ['jednokrotny', 'wielokrotny']
  user: User;
  newTest: boolean;
  idExistingTest: number;
  initialized: boolean = false;
  newTestForm: FormGroup;

  constructor(private fb: FormBuilder, private dictionary: DictionaryService,
    private creating: CreatingService, private cookie: CookieService,
    private router: Router, private route: ActivatedRoute, private test: TestService) {
    this.route.params.subscribe(x => {
      console.log(x);
      let id = x['id'];
      if (id != undefined) { this.newTest = false; this.idExistingTest = id; } else { this.newTest = true; }
      console.log(this.newTest);
      console.log(this.idExistingTest);
    });
  }

  ngOnInit() {
    this.user = (JSON.parse(this.cookie.get('user')));

    if (this.newTest) {
    this.newTestForm = this.fb.group({
      name: ['', Validators.required],
      nOQuestions: ['', Validators.required],
      limitedTime: [false],
      multipleChoice: ['Krotność wyboru', Validators.required],
      time: [''],
      course: ['Kierunek studiów'],
      description: ['']
    });
      this.initialized = true;
      this.newTestForm.controls.time.disable();
      this.dictionary.getCourses().subscribe(x => {
        console.log(x[1].NAME);
        this.coursesTable = x;
      })
    }
    else {

      this.dictionary.getCourses().subscribe(x => {
        console.log(x[1].NAME);
        this.coursesTable = x;
      })
      this.test.getQuizDetails(this.idExistingTest).subscribe(x => {
        console.log(x);
        this.newTestForm = this.fb.group({
          name: [x.NAME, Validators.required],
          nOQuestions: [x.N_O_QUESTIONS, Validators.required],
          limitedTime: [x.LIMITED_TIME = 0 ? false : true],
          multipleChoice: [x.MULTIPLE_CHOICE = 0 ? 'jednokrotny' : 'wielokrotny', Validators.required],
          time: ['01:01'],
          course: [x.COURSE],
          description: [x.DESCRIPTION]
        });
        this.initialized = true;
      });
    }
  }

  onClickLimitedTime() {
    if (!this.newTestForm.controls.limitedTime.value) {
      this.newTestForm.controls.time.enable();
    }
    else { this.newTestForm.controls.time.disable(); }
  }
  
  onBack(){
    this.router.navigate(['../teacher_panel'], { relativeTo: this.route });
  }
  onCreate() {
    if (this.newTestForm.valid) {
      let subject = new Subject();
      if (this.newTestForm.controls.limitedTime) {
        subject.time = (this.newTestForm.controls.time.value.split(":")[0]) * 60
          + this.newTestForm.controls.time.value.split(":")[1] * 1;
      }
      subject.id = 2;
      subject.idAuthor = this.user.id;
      subject.description = this.newTestForm.controls.description.value;
      subject.name = this.newTestForm.controls.name.value;
      if (this.newTestForm.controls.multipleChoice.value == "jednokrotny") {
        subject.multipleChoice = false;
      }
      else {
        subject.multipleChoice = true;
      }

      subject.limitedTime = this.newTestForm.controls.limitedTime.value;
      subject.course = this.newTestForm.controls.course.value;
      subject.nOQuestions = this.newTestForm.controls.nOQuestions.value;
      this.creating.createSubject(subject).subscribe(x => {
        console.log(x.id);
        this.cookie.set("idSubject", x.id.toString());
      }, e => console.log(e));
      this.router.navigate(['./new_question'], { relativeTo: this.route });
    }
  }
}
