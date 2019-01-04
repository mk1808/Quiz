import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Answer, Question, Subject } from 'src/app/quiz/shared/models/classes';
import { CreatingService } from 'src/app/quiz/shared/services/creating.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { QuestionListComponent } from './question-list/question-list.component';
import { TestService } from 'src/app/quiz/shared/services/test.service';
import { MatRadioGroup, MatRadioButton, MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})

export class NewQuestionComponent implements OnInit, AfterViewInit {
  @ViewChild('questionList')
  questionList: QuestionListComponent;

  @ViewChild('radioButton')
  radioButton: MatRadioButton;

  initialized: boolean = false;
  newQuestionForm: FormGroup;
  newQuestion: boolean;
  idExistingQuestion: string;
  subject: Subject;
  question:Question;
  answers = [new Answer, new Answer, new Answer, new Answer];
  quizName: string;
  idSubject: string;
  constructor(private fb: FormBuilder, private creating: CreatingService,
    private test: TestService, private router: Router, private route: ActivatedRoute,
    private cookie: CookieService) {
    this.route.params.subscribe(x => {
      let id = x['id'];
      if (id != undefined) { this.newQuestion = false; this.idExistingQuestion = id; }
      else { this.newQuestion = true; }

    })
  }

  ngOnInit() {
    if (this.cookie.get('user') == "") {
      this.router.navigate(['/']);
    }
    else {
      if (JSON.parse(this.cookie.get('user')).role == 2) {
        this.router.navigate(['/quiz/student_panel']);
      }
      else {
        this.subject = JSON.parse(this.cookie.get("subject"));
        console.log("jebanekurwagówno", this.subject);
        if (this.newQuestion) {
          this.initEmptyForm();
          if (this.cookie.get('idSubject') == "") {
            this.router.navigate(['/creating/teacher_panel'])
          }
          else {
            this.idSubject = this.cookie.get('idSubject');
            if (this.subject.multipleChoice) {
              this.newQuestionForm.controls.checkAnswer0.setValue(false);
              this.newQuestionForm.controls.checkAnswer1.setValue(false);
              this.newQuestionForm.controls.checkAnswer2.setValue(false);
              this.newQuestionForm.controls.checkAnswer3.setValue(false);
            }

            this.test.getQuizDetails(this.idSubject).subscribe(x => {
              if (x.status == 200) {
                x = x.body;
                this.quizName = x.NAME;
              }
            });
          }
        }
        else {

          this.test.getQuestionDetails(this.idExistingQuestion).subscribe(x => {
            this.initForm(x);
          }

          )

        }
      }

    }
  }
  ngAfterViewInit() {
    if (this.newQuestion)
      this.subscribeRadioButton();

  }

  subscribeRadioButton() {
    console.log(this.initialized)
    if (!this.subject.multipleChoice) {
      console.log(this.radioButton);
      this.radioButton.radioGroup.change.subscribe(x => {
        console.log(x);
        this.newQuestionForm.controls.checkAnswer0.setValue(false);
        this.newQuestionForm.controls.checkAnswer1.setValue(false);
        this.newQuestionForm.controls.checkAnswer2.setValue(false);
        this.newQuestionForm.controls.checkAnswer3.setValue(false);

        // <3 <3 <3 <3 tak bardzo mocno kochajoooo <3 <3 <3 <3 <3 

        switch (x.value) {
          case ("0"): {
            this.newQuestionForm.controls.checkAnswer0.setValue(true);
            break;
          }
          case ("1"): {
            this.newQuestionForm.controls.checkAnswer1.setValue(true);
            break;
          }
          case ("2"): {
            this.newQuestionForm.controls.checkAnswer2.setValue(true);
            break;
          }
          case ("3"): {
            this.newQuestionForm.controls.checkAnswer3.setValue(true);
            break;
          }
        }
      })
    }
  }

  initForm(x) {
    x = x.body;
    this.question=x;
    let answers = x.answers;
    this.newQuestionForm = this.fb.group({
      category: [x.category, Validators.required],
      question: [x.text, Validators.required],
      photo: [x.image],
      code: [x.code],
      answer0: [x.answers[0].text, Validators.required],
      answer1: [x.answers[1].text, Validators.required],
      answer2: [x.answers[2].text, Validators.required],
      answer3: [x.answers[3].text, Validators.required],
      checkAnswer0: [x.answers[0].status == 1],
      checkAnswer1: [x.answers[1].status == 1],
      checkAnswer2: [x.answers[2].status == 1],
      checkAnswer3: [x.answers[3].status == 1],
      radioGroup:[null]
    });
    this.initialized = true;
    this.idSubject = this.cookie.get('idSubject');
    if (this.subject.multipleChoice) {
      this.newQuestionForm.controls.checkAnswer0.setValue(x.answers[0].status == 1);
      this.newQuestionForm.controls.checkAnswer1.setValue(x.answers[1].status == 1);
      this.newQuestionForm.controls.checkAnswer2.setValue(x.answers[2].status == 1);
      this.newQuestionForm.controls.checkAnswer3.setValue(x.answers[3].status == 1);

    }

    this.test.getQuizDetails(this.idSubject).subscribe(x => {
      if (x.status == 200) {
        x = x.body;
        this.quizName = x.NAME;
        this.subscribeRadioButton();
          if (!this.subject.multipleChoice) {
            let i = 0;
            answers.forEach(element => {
              if (element.status == '1') {
                console.log(element);
                let change: MatRadioChange = { value: i.toString(), source: this.radioButton }
                this.radioButton.radioGroup.change.emit( change);
                this.newQuestionForm.controls.radioGroup.setValue(i.toString());
              }
              i++;
            });
          }
      }
    });
  }

  initEmptyForm() {
    this.newQuestionForm = this.fb.group({
      category: ['', Validators.required],
      question: ['', Validators.required],
      photo: [null],
      code: [null],
      answer0: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      checkAnswer0: [false],
      checkAnswer1: [false],
      checkAnswer2: [false],
      checkAnswer3: [false],
      radioGroup:[null]
    });
    this.initialized = true;
  }

  onAdd() {
    
    if (this.newQuestionForm.valid) {

      let question = new Question;
      //////////////////////////////////////////
      question.idSubject = this.idSubject;

      question.category = this.newQuestionForm.controls.category.value;
      question.text = this.newQuestionForm.controls.question.value;
      question.code = this.newQuestionForm.controls.code.value;
      question.image = this.newQuestionForm.controls.photo.value;
      question.answers[0] = {
        text: this.newQuestionForm.controls.answer0.value,
        status: this.newQuestionForm.controls.checkAnswer0.value,
        id: null, idQuestion: null
      }
      question.answers[1] = {
        text: this.newQuestionForm.controls.answer1.value,
        status: this.newQuestionForm.controls.checkAnswer1.value,
        id: null, idQuestion: null
      }
      question.answers[2] = {
        text: this.newQuestionForm.controls.answer2.value,
        status: this.newQuestionForm.controls.checkAnswer2.value,
        id: null, idQuestion: null
      }
      question.answers[3] = {
        text: this.newQuestionForm.controls.answer3.value,
        status: this.newQuestionForm.controls.checkAnswer3.value,
        id: null, idQuestion: null
      }
if (this.newQuestion){
      this.creating.createQuestion(question).subscribe(x => {//console.log(x);

        if (x.status == 200) {
          x = x.body;
          this.questionList.ngOnInit();
          this.onClear();
        }
      }, e => console.log(e));

}
else{
  question.id=this.question.id;
  for(let i =0; i<4; i++){
    question.answers[i].id=this.question.answers[i].id;

  }
  this.creating.updateQuestion(question).subscribe(
    x=>{
      if (x.status == 200) {
        this.router.navigate(["/creating/new_test/resume"]);
      }
    }

  )
}
    }
  }

  onClear() {
    this.newQuestionForm.controls.category.setValue('');
    this.newQuestionForm.controls.question.setValue('');
    this.newQuestionForm.controls.code.setValue('');
    this.newQuestionForm.controls.photo.setValue('');
    this.newQuestionForm.controls.answer0.setValue('');
    this.newQuestionForm.controls.answer1.setValue('');
    this.newQuestionForm.controls.answer2.setValue('');
    this.newQuestionForm.controls.answer3.setValue('');
    this.newQuestionForm.controls.checkAnswer0.setValue(false);
    this.newQuestionForm.controls.checkAnswer1.setValue(false);
    this.newQuestionForm.controls.checkAnswer2.setValue(false);
    this.newQuestionForm.controls.checkAnswer3.setValue(false);
    this.newQuestionForm.controls.radioGroup.setValue(null);
  }
  onBack() {
    if (this.newQuestion)
    {
    this.router.navigate(['/creating/new-test']);}
    else
    {
      this.router.navigate(['/creating/teacher_panel']);
    }
  }
  onResume() {
    this.router.navigate(["/creating/new-test/resume"]);
  }
}
