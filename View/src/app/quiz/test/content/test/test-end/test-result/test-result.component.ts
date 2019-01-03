import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/quiz/shared/models/classes';
import { TestService } from 'src/app/quiz/shared/services/test.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {
  questionWithAnswer: Question;
  question:Question;
  containsPhoto: boolean = false;
  containsCode: boolean = false;
  multipleChoice:string;
  initialized:boolean=false;
  

  @Input() set setQuestion(question: Question) {
    this.question = question;
    console.log("putanieeeee",question);
    this.testService.getQuestionDetails(this.question.id).subscribe(x => {
    this.questionWithAnswer = x.body;
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

}
