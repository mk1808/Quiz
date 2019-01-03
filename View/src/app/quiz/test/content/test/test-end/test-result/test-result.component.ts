import { Component, OnInit, Input } from '@angular/core';
import { Question, QuestionStatus } from 'src/app/quiz/shared/models/classes';
import { TestService } from 'src/app/quiz/shared/services/test.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {
  questionWithAnswer: Question;
  question:QuestionStatus;
  containsPhoto: boolean = false;
  containsCode: boolean = false;
  multipleChoice:string;
  initialized:boolean=false;
  trueTable:boolean[]=[];


  @Input() set setQuestion(question: QuestionStatus) {
    this.question = question;
    console.log("putanieeeee",question);
    this.testService.getQuestionDetails(this.question.id).subscribe(x => {
    this.questionWithAnswer = x.body;
    this.questionWithAnswer.answers.forEach(x=>
      {
        this.trueTable.push(this.findAnswer(x.id)[0].value==1?true:false)
      })
    console.log(x.body)
      if ((this.questionWithAnswer.image != null) && (this.questionWithAnswer.image != undefined)
       && (this.questionWithAnswer.image != ""))
        this.containsPhoto = true;
      if (this.questionWithAnswer.code != "") this.containsCode = true;
      this.initialized=true;
    }
    )

    this.multipleChoice=this.cookie.get('multipleChoice');

  }
  constructor(private testService: TestService,private cookie: CookieService) { }

  ngOnInit() {




  }

  findAnswer(id){
    console.log( this.question.answers.filter(x=>x.id==id));
    return this.question.answers.filter(x=>x.id==id);
    
  }

}
