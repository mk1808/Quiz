import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Answer, AnswerStatus } from 'src/app/shared/models/classes';
import { MatCheckbox } from '@angular/material';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  answer: Answer;
  color = 'white';
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
      this.color = '#2b8e94'; } else {
      this.answerS.value = 0;
      if (this.checkbox.checked) {
      this.checkbox.toggle();
      }
      this.color = 'white';
    }

    this.onChange.emit(this.answerS);
  }
  ngOnInit() {
  }

}
