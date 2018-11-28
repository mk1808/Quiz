import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Answer, AnswerStatus } from 'src/app/quiz/shared/models/classes';
import { MatCheckbox } from '@angular/material';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  answer: Answer;
  color = '#505050';
  answerS = new AnswerStatus();
  @Input() set setAnswer(answer: Answer) {
    this.answer = answer;
    this.answerS.id = this.answer.id;
    this.answerS.value = 0;
  }
  @Output() onChange = new EventEmitter<AnswerStatus>();
  @ViewChild('checkbox')
  checkbox: MatCheckbox;

  constructor() { }

  public onClick() {
    if (this.answerS.value === 0) {
      this.answerS.value = 1;
      if (!this.checkbox.checked) {
      this.checkbox.checked = true;
      }
      this.color = '#707070'; } else {
      this.answerS.value = 0;
      if (this.checkbox.checked) {
      this.checkbox.toggle();
      }
      this.color = '#505050';
    }

    this.onChange.emit(this.answerS);
  }
  ngOnInit() {
  }

}