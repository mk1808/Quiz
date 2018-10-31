import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/shared/services/test.service';
import { Question, QuestionStatus } from 'src/app/shared/models/classes';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  questions:Question[]=[];
  questions1=Question;
  questionStatuses:QuestionStatus[]=[];
  status=new QuestionStatus;
  constructor(private testService:TestService) {

  }
  
  public onChange(questionStatus:QuestionStatus){
    let exist:boolean=false;
    this.questionStatuses.forEach(element => {
          if (element.id==questionStatus.id)
          {
            element=questionStatus;
            exist=true;
          }
    }
    );

    if (!exist){
      this.questionStatuses.push(questionStatus);
    }
  }

  ngOnInit() {
    this.testService.getQuestions().subscribe(x=>{
      console.log(x);

      this.questions = x;
    });
  }

}
