import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.css']
})
export class TestViewComponent implements OnInit {
/*
  obj: Question[] = [];
  */
  constructor() { }

  ngOnInit() {
  }
  /*
    console.log(this.testService.getResult());
    this.testService.getQuestions().subscribe(x => {
      this.obj = x;
      console.log(this.obj);
    });

    const questionsStatuses: QuestionStatus[] = [];

    const questionStatus: QuestionStatus = new QuestionStatus;
    questionStatus.id = 1;
    questionStatus.answers = [];

    const answer: AnswerStatus = new AnswerStatus;
    answer.id = 1;
    answer.value = 0;

    questionStatus.answers.push(answer);
    const answer2: AnswerStatus = new AnswerStatus;
    answer2.id = 2;
    answer2.value = 1;

    questionStatus.answers.push(answer2);
    const answer3: AnswerStatus = new AnswerStatus;
    answer3.id = 3;
    answer3.value = 0;

    questionStatus.answers.push(answer3);
    const answer4: AnswerStatus = new AnswerStatus;
    answer4.id = 4;
    answer4.value = 0;

    questionStatus.answers.push(answer4);

    questionsStatuses.push(questionStatus);

    this.testService.checkAnswers(questionsStatuses).subscribe(x => {
      console.log(x);
      this.testService.setResult(x);
      console.log(this.testService.getResult());
    });
  }
*/
}
