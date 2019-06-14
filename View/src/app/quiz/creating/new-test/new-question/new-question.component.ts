import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Answer, Question, Subject } from 'src/app/quiz/shared/models/classes';
import { CreatingService } from 'src/app/quiz/shared/services/creating.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { QuestionListComponent } from './question-list/question-list.component';
import { TestService } from 'src/app/quiz/shared/services/test.service';
import { MatRadioGroup, MatRadioButton, MatRadioChange } from '@angular/material';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UploadFile } from 'ngx-file-drop';
import { DomSanitizer } from '@angular/platform-browser';

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
  question: Question;
  answers = [new Answer, new Answer, new Answer, new Answer];
  quizName: string;
  idSubject: string;
  checkBoxStyles = [];
  answerStyles = [];
  pleaseCheckAnswer = false;
  modalRef: BsModalRef;
  questionText: string;
  file: File;

  public files: UploadFile[] = []; 
public image: any; 
imageControl:string; 

  constructor(private fb: FormBuilder, private creating: CreatingService,
    private test: TestService, private router: Router, private route: ActivatedRoute,
    private cookie: CookieService, private modalService: BsModalService,
    public domSanitizer: DomSanitizer) {
    this.route.params.subscribe(x => {
      let id = x['id'];
      if (id != undefined) { this.newQuestion = false; this.idExistingQuestion = id; }
      else { this.newQuestion = true; }
    })
  }

  ngOnInit() {
    window.scroll(0, 0);
    if (this.cookie.get('user') == "") {
      this.router.navigate(['/']);
    }
    else {
      if (JSON.parse(this.cookie.get('user')).role == 2) {
        this.router.navigate(['/quiz/student_panel']);
      }
      else {
        this.subject = JSON.parse(this.cookie.get("subject"));
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
            this.creating.getQuizDetails(this.idSubject).subscribe(x => {
              this.quizName = x.name;
            });
          }
        }
        else {
          this.creating.getQuestionById(this.idExistingQuestion).subscribe(x => {
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
    if (!this.subject.multipleChoice) {
      this.radioButton.radioGroup.change.subscribe(x => {
        this.newQuestionForm.controls.checkAnswer0.setValue(false);
        this.newQuestionForm.controls.checkAnswer1.setValue(false);
        this.newQuestionForm.controls.checkAnswer2.setValue(false);
        this.newQuestionForm.controls.checkAnswer3.setValue(false);
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
    let code = x.code;
    let text = x.text;
    this.question = x;
    let answers = x.answers;
    this.questionText = text;
    this.newQuestionForm = this.fb.group({
      question: [text, Validators.required],
      photo: [x.image],
      code: [code],
      answer0: [x.answers[0].text, Validators.required],
      answer1: [x.answers[1].text, Validators.required],
      answer2: [x.answers[2].text, Validators.required],
      answer3: [x.answers[3].text, Validators.required],
      checkAnswer0: [x.answers[0].status == 1],
      checkAnswer1: [x.answers[1].status == 1],
      checkAnswer2: [x.answers[2].status == 1],
      checkAnswer3: [x.answers[3].status == 1],
      radioGroup: [null]
    }, { validator: this.formValidator });
    this.initialized = true;
    this.newQuestionForm.statusChanges.subscribe(x => {
      this.checkAnswerValid();
    });
    this.idSubject = this.cookie.get('idSubject');
    if (this.subject.multipleChoice) {
      this.newQuestionForm.controls.checkAnswer0.setValue(x.answers[0].status == 1);
      this.newQuestionForm.controls.checkAnswer1.setValue(x.answers[1].status == 1);
      this.newQuestionForm.controls.checkAnswer2.setValue(x.answers[2].status == 1);
      this.newQuestionForm.controls.checkAnswer3.setValue(x.answers[3].status == 1);
    }
    this.creating.getQuizDetails(this.idSubject).subscribe(x => {
      this.quizName = x.name;
      this.subscribeRadioButton();
      if (!this.subject.multipleChoice) {
        let i = 0;
        answers.forEach(element => {
          if (element.status == '1') {
            let change: MatRadioChange = { value: i.toString(), source: this.radioButton }
            this.radioButton.radioGroup.change.emit(change);
            this.newQuestionForm.controls.radioGroup.setValue(i.toString());
          }
          i++;
        });
      }
    });
  }

  initEmptyForm() {
    this.newQuestionForm = this.fb.group({
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
      radioGroup: [null]
    }, { validator: this.formValidator });
    this.initialized = true;
    this.newQuestionForm.statusChanges.subscribe(x => {
      this.checkAnswerValid();
    });
  }

  formValidator(group: FormGroup) {
    let correct = true;
    if (group.controls.answer0.value == "") {
      correct = false;
      group.controls.answer0.setErrors({ 'invalid': true });
    }
    if (group.controls.answer1.value == "") {
      correct = false;
      group.controls.answer1.setErrors({ 'invalid': true });
    }
    if (group.controls.answer2.value == "") {
      correct = false;
      group.controls.answer2.setErrors({ 'invalid': true });
    }
    if (group.controls.answer3.value == "") {
      correct = false;
      group.controls.answer3.setErrors({ 'invalid': true });
    }

    if (!group.controls.checkAnswer0.value &&
      !group.controls.checkAnswer1.value &&
      !group.controls.checkAnswer2.value &&
      !group.controls.checkAnswer3.value) {
      group.controls.checkAnswer3.setErrors({ 'invalid': true });
    }
    else
      group.controls.checkAnswer3.setErrors(null);
    if (correct)
      group.setErrors(null);
    return correct ? null : true;
  }

  checkAnswerValid() {
    if (this.newQuestionForm.controls.answer0.invalid && this.newQuestionForm.controls.answer0.touched)
      this.answerStyles[0] = 'invalid';
    else
      this.answerStyles[0] = '';
    if (this.newQuestionForm.controls.answer1.invalid && this.newQuestionForm.controls.answer1.touched)
      this.answerStyles[1] = 'invalid';
    else
      this.answerStyles[1] = '';
    if (this.newQuestionForm.controls.answer2.invalid && this.newQuestionForm.controls.answer2.touched)
      this.answerStyles[2] = 'invalid';
    else
      this.answerStyles[2] = '';
    if (this.newQuestionForm.controls.answer3.invalid && this.newQuestionForm.controls.answer3.touched)
      this.answerStyles[3] = 'invalid';
    else
      this.answerStyles[3] = '';
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onCancel(){
    this.modalRef.hide();
  }

  onDelet() {
    this.creating.deleteQuestion(this.idExistingQuestion).subscribe(x => {
      if (x) {
        this.router.navigate(["/creating/new_test/resume"]);
      }
    }, e=>{
      if(e.status ==200){
        this.router.navigate(['/creating/new_test/resume']);
      }
    }
    );
    this.modalRef.hide();
  }

  onAdd() {
    if (this.newQuestionForm.valid) {
      let question = new Question;
      question.idSubject =Number( this.idSubject);
      let code = this.newQuestionForm.controls.code.value;
      let text = this.newQuestionForm.controls.question.value;
      question.code = code;
      question.text = text;
      this.file==null?question.image=this.newQuestionForm.controls.photo.value:
      question.image=this.image;
      
      question.answers[0]=new Answer;
      question.answers[0].text= this.newQuestionForm.controls.answer0.value;
      question.answers[0].status= this.newQuestionForm.controls.checkAnswer0.value;
      
      question.answers[1]=new Answer;
      question.answers[1].text= this.newQuestionForm.controls.answer1.value;
      question.answers[1].status= this.newQuestionForm.controls.checkAnswer1.value;
      
      question.answers[2]=new Answer;
      question.answers[2].text= this.newQuestionForm.controls.answer2.value;
      question.answers[2].status= this.newQuestionForm.controls.checkAnswer2.value;
      
      question.answers[3]=new Answer;
      question.answers[3].text= this.newQuestionForm.controls.answer3.value;
      question.answers[3].status= this.newQuestionForm.controls.checkAnswer3.value;

      if (this.newQuestion) {
        this.creating.createQuestion(question).subscribe(x => {
          this.questionList.ngOnInit();
          this.onClear();

        }, e => {});
      }
      else {
        question.id = this.question.id;
        for (let i = 0; i < 4; i++) {
          question.answers[i].id = this.question.answers[i].id;
        }
        this.creating.updateQuestion(question).subscribe(
          x => {
            this.ngOnInit();
            this.questionList.ngOnInit();
          }
        )
      }
    }
    else {
      this.newQuestionForm.controls.question.markAsTouched();
      this.newQuestionForm.controls.answer0.markAsTouched();
      this.newQuestionForm.controls.answer1.markAsTouched();
      this.newQuestionForm.controls.answer2.markAsTouched();
      this.newQuestionForm.controls.answer3.markAsTouched();
      if (!this.newQuestionForm.controls.checkAnswer0.value &&
        !this.newQuestionForm.controls.checkAnswer1.value &&
        !this.newQuestionForm.controls.checkAnswer2.value &&
        !this.newQuestionForm.controls.checkAnswer3.value)
        this.pleaseCheckAnswer = true;
      else this.pleaseCheckAnswer = false;
      this.checkAnswerValid();
      if (this.pleaseCheckAnswer)
        window.scroll(0, window.innerHeight / 3);
      else
        window.scroll(0, window.innerHeight / 3);
    }
  }

  onClear() {
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
    this.pleaseCheckAnswer = false;
   
    for (let i = 0; i < 4; i++)
      this.answerStyles[i] = '';
   
      this.newQuestionForm.controls.question.markAsUntouched();
    this.newQuestionForm.controls.answer0.markAsUntouched();
    this.newQuestionForm.controls.answer1.markAsUntouched();
    this.newQuestionForm.controls.answer2.markAsUntouched();
    this.newQuestionForm.controls.answer3.markAsUntouched();
    this.image=false;
    window.scroll(0, window.innerHeight / 3);
  }

  onBack() {
    if (this.newQuestion) {
      let id = this.subject.id;
      this.router.navigate(['/creating/new_test', id]);
    }
    else {
      this.router.navigate(['/creating/new_test/resume']);
    }
  }

  onResume() {
    this.router.navigate(["/creating/new_test/resume"]);
  }
  
changeListener($event): void {
  this.readThis($event.target);
  
}

onPhoto(){
  this.file=null;
  this.image=false;
}

readThis(inputValue: any): void {
  this.file = inputValue.files[0];
  this.newQuestionForm.controls.photo.setValue("");
  var myReader: FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
    this.imageControl=''; 
  }
  myReader.readAsDataURL(this.file);
}
}
