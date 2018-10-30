import { Component, OnInit } from '@angular/core';
import {TestService} from "../shared/services/test.service";
import {AnswerStatus, Question, QuestionStatus} from "../shared/models/classes";

@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.css']
})
export class TestViewComponent implements OnInit {

  obj:Question[]=[];
  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService.getQuestions().subscribe(x=>{
      this.obj=x;
      //x.questions.forEach(t => console.log(t));
    });

    let questionsStatuses:QuestionStatus[]=[];

    let questionStatus:QuestionStatus=new QuestionStatus;
    questionStatus.id = 1;
    questionStatus.answers = [];

    let answer:AnswerStatus = new AnswerStatus;
    answer.id = 1;
    answer.value = 0;

    questionStatus.answers.push(answer);
    let answer2:AnswerStatus = new AnswerStatus;
    answer2.id = 2;
    answer2.value = 1;

    questionStatus.answers.push(answer2);
    let answer3:AnswerStatus = new AnswerStatus;
    answer3.id = 3;
    answer3.value = 0;

    questionStatus.answers.push(answer3);
    let answer4:AnswerStatus = new AnswerStatus;
    answer4.id = 4;
    answer4.value = 0;

    questionStatus.answers.push(answer4);

    questionsStatuses.push(questionStatus);

    this.testService.checkAnswers(questionsStatuses).subscribe(x=>{
      console.log(x);
    });
  }

}
