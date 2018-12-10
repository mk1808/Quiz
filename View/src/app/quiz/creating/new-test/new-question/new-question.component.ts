import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Answer } from 'src/app/quiz/shared/models/classes';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {
  newQuestionForm: FormGroup = this.fb.group({
    category: ['', Validators.required],
    question: ['', Validators.required],
    photo: ['', Validators.required],
    code: ['', Validators.required],
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

}
