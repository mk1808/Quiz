import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
    answer: ['', Validators.required]
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
