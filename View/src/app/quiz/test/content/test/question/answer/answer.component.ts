import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit} from '@angular/core';
import { Answer, AnswerStatus } from 'src/app/quiz/shared/models/classes';
import { MatCheckbox, MatRadioButton } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit, AfterViewInit {
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
  multipleChoice:string;
  @ViewChild('checkbox2')
  radio: MatRadioButton;
  constructor( private cookie:CookieService) { }

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
    this.radio.radioGroup.change.emit();
  }
  ngOnInit() {
    this.multipleChoice=this.cookie.get('multipleChoice');
    console.log("answe ", this.multipleChoice);
    
      
  }
  ngAfterViewInit(){
    this.radio.radioGroup.change.subscribe(x=>
      {console.log("aaaaaaaaaaaaa");
      this.answerS.value=this.radio.checked?1:0;
      this.onChange.emit(this.answerS);
    console.log("thisans", this.answerS);})
  }
}
