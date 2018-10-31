import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Answer, AnswerStatus, QuestionStatus } from 'src/app/shared/models/classes';
import { Question } from 'src/app/shared/models/classes';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
//answers:Answer[]=[];
//colors:string[]=[];
question:Question; 
status= new QuestionStatus;

@Output() questionStatus = new EventEmitter<QuestionStatus>();

@Input() set setQuestion(question:Question){
  this.question=question;
  this.status.id=question.id;
  /* for (let i=0; i<this.question.answers.length; i++)
    {
      let color:string;
      color="white";
      this.colors.push(color);
    } */
}

  constructor() {
    
   }
   
   public onChange(answerStatus:AnswerStatus){
     let exist:boolean=false;
    this.status.answers.forEach(element => {
          if (element.id==answerStatus.id)
          {
            element=answerStatus;
            exist=true;
          }
           

    }
    );

    if (!exist){
      this.status.answers.push(answerStatus);
    }
  
    this.questionStatus.emit(this.status);
   }

  ngOnInit(

  ) {
    
  }
public getStatus(id:number){
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
