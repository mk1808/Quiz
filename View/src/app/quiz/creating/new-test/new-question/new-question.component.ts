import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Answer, Question } from 'src/app/quiz/shared/models/classes';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {
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
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onAdd(){
    if (this.newQuestionForm.valid)
    {
      let question = new Question;
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

    }
  }
}
