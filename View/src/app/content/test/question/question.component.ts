import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Answer, AnswerStatus, QuestionStatus} from 'src/app/shared/models/classes';
import {Question} from 'src/app/shared/models/classes';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question: Question;
  status = new QuestionStatus;
  containsPhoto:boolean;
 
  containsCode:boolean;
  @Output() questionStatus = new EventEmitter<QuestionStatus>();

  @Input() set setQuestion(question: Question) {
    this.question = question;
    this.status.id = question.id;

   if (question.image!=null) this.containsPhoto=true;

    question.answers.forEach(
      answer => {
      const  answerStatus = new AnswerStatus();
        answerStatus.id = answer.id;
        answerStatus.value = 0;
        this.status.answers.push(answerStatus);
        
      }
    );
  }

  constructor() {

  }

  public onChange(answerStatus: AnswerStatus) {
    let exist = false;
    let i = 0;
    let id = 0;
    this.status.answers.forEach(element => {
        if (element.id === answerStatus.id) {
          //element = answerStatus;
          exist = true;
          id = i;
        }
        i++;
      }
    );

    if (exist) {
      this.status.answers[id] = answerStatus;
    }
    this.questionStatus.emit(this.status);
    
  }

  ngOnInit() {

  }

  public getStatus(id: number) {
    /*
     if(document.readyState)
     {
     if (this.colors[id]!='white'){
     this.colors[id]= 'white';
     }
     else{
     this.colors[id]= '#649494';
     }
     } */
  }
}
