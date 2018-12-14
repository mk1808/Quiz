import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Answer, Question } from 'src/app/quiz/shared/models/classes';
import { CreatingService } from 'src/app/quiz/shared/services/creating.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { QuestionListComponent } from './question-list/question-list.component';
import { TestService } from 'src/app/quiz/shared/services/test.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})

export class NewQuestionComponent implements OnInit {
  @ViewChild('questionList')
  questionList:QuestionListComponent;


  newQuestionForm: FormGroup = this.fb.group({
    category: ['', Validators.required],
    question: ['', Validators.required],
    photo: [null],
    code: [null],
    answer0: ['', Validators.required],
    answer1: ['', Validators.required],
    answer2: ['', Validators.required],
    answer3: ['', Validators.required],
    checkAnswer0:[false],
    checkAnswer1:[false],
    checkAnswer2:[false],
    checkAnswer3:[false],
  });
  answers=[new Answer, new Answer, new Answer, new Answer ];
  quizName:string;
  idSubject:string;
  constructor(private fb: FormBuilder, private creating:CreatingService,
    private test:TestService, private router:Router, private route:ActivatedRoute,  
    private cookie:CookieService ) { }

  ngOnInit() {
    this.idSubject=this.cookie.get('idSubject');
    this.test.getQuizDetails(this.idSubject).subscribe(x=>{
      this.quizName=x.NAME;
      console.log(x);
    });

  }

  onAdd(){
    if (this.newQuestionForm.valid)
    {
      let question = new Question;
      //////////////////////////////////////////
      question.idSubject=this.idSubject;
      
      question.category=this.newQuestionForm.controls.category.value;
      question.text=this.newQuestionForm.controls.question.value;
      question.code=this.newQuestionForm.controls.code.value;
      question.image=this.newQuestionForm.controls.photo.value;
      question.answers[0]={
        text:this.newQuestionForm.controls.answer0.value, 
        status:this.newQuestionForm.controls.checkAnswer0.value,
        id:null,idQuestion:null}
      question.answers[1]={
        text:this.newQuestionForm.controls.answer1.value, 
        status:this.newQuestionForm.controls.checkAnswer1.value,
        id:null,idQuestion:null}
      question.answers[2]={
        text:this.newQuestionForm.controls.answer2.value, 
        status:this.newQuestionForm.controls.checkAnswer2.value,
        id:null,idQuestion:null}
      question.answers[3]={
        text:this.newQuestionForm.controls.answer3.value, 
        status:this.newQuestionForm.controls.checkAnswer3.value,
        id:null,idQuestion:null}

        this.creating.createQuestion(question).subscribe(x=>
          {//console.log(x);
          this.questionList.ngOnInit();
          this.onClear();},e=>console.log(e) );
    
    }
  }

  onClear(){
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
  }
  onBack(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onResume(){
    this.router.navigate(['../resume'], { relativeTo: this.route });
  }
}
