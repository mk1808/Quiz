import { Component, OnInit, Input} from '@angular/core';
import { Answer } from 'src/app/shared/models/classes';
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
@Input() set setQuestion(question:Question){
  this.question=question;
  /* for (let i=0; i<this.question.answers.length; i++)
    {
      let color:string;
      color="white";
      this.colors.push(color);
    } */
}

  constructor() {
    
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
