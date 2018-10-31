import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/shared/models/classes';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
answers:Answer[]=[];
colors:string[]=[];
  constructor() {
    for (let i=0; i<4; i++){
      let answer= new Answer;
      answer.id=i*3;
      answer.text="Sweet in roast, dripper, aged, aromatic black robust brewed filter galão medium.";
      this.answers.push(answer);
    }
   }

  ngOnInit() {
    for (let i=0; i<this.answers.length; i++)
    {
      let color:string;
      color="white";
      this.colors.push(color);
    }
  }
public getStatus(id:number){

  if(document.readyState)
  {
  if (this.colors[id]!='white'){
    this.colors[id]= 'white';
  }
  else{
    this.colors[id]= '#649494';
  }
}
}
}
