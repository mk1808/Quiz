import { Component, OnInit,Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Answer, AnswerStatus } from 'src/app/shared/models/classes';
import { MatCheckbox } from '@angular/material';

@Component({
  selector: 'app-answer', 
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  answer:Answer;
  color:string;
  @Input() set setAnswer(answer:Answer){
    this.answer=answer;
  }
  @Output() onChange = new EventEmitter<AnswerStatus>();
  @ViewChild("checkbox")
  checkbox:MatCheckbox;




  constructor() { }
  public onClick(){
    let answerS= new AnswerStatus;
    answerS.id=this.answer.id;
    if (this.checkbox.value){
    answerS.value=1;
    this.color="#649494";}
    else
    {answerS.value=0;
      this.color="white";
    }
    this.onChange.emit(answerS);
    
  }
  ngOnInit() {
  }

}
