import { Component, OnInit, Input } from '@angular/core';
import { Question, QuestionStatus, Answer, AnswerStatus } from 'src/app/quiz/shared/models/classes';
import { TestService } from 'src/app/quiz/shared/services/test.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {
  question: QuestionStatus;
  containsPhoto: boolean = false;
  containsCode: boolean = false;
  multipleChoice: boolean;
  initialized: boolean = false;
  trueTable: boolean[] = [];
  answerStatuses: string[] = [];
  questionStatus: string = "";
  loaded = false;

  @Input() number;
  @Input() set setQuestion(question: QuestionStatus) {
    this.question = question;

    this.multipleChoice = this.cookie.get('multipleChoice') == 'true';
  }
  @Input() set setQuestionWithAnswer(question: Question) {
    this.questionWithAnswer = question;
    this.checkAnswers();
  }
  questionWithAnswer: Question;

  constructor(private testService: TestService, private cookie: CookieService) { }
  ngOnInit() {
  }

  findAnswer(id) {
    return this.question.answers.filter(x => x.id == id);
  }

  checkAnswers() {
    let status = 1;
    this.questionWithAnswer.answers.forEach(x => {
      this.trueTable.push(this.findAnswer(x.id)[0].status == 1)
      if ((x.status) && this.trueTable[this.trueTable.length - 1]) {
        this.answerStatuses.push("correct");
      }
      else if (x.status) {
        this.answerStatuses.push("correct");
        status = -1;
      } else if (!(x.status) && this.trueTable[this.trueTable.length - 1]) {
        this.answerStatuses.push("incorrect");
        status = -1;
      }
      else {
        this.answerStatuses.push("");
      }
    })
    if (status > 0) {
      this.questionStatus = "correct";
    }
    else {
      this.questionStatus = "incorrect";
    }
    if ((this.questionWithAnswer.image != null) && (this.questionWithAnswer.image != undefined)
      && (this.questionWithAnswer.image != ""))
      this.containsPhoto = true;
    if (this.questionWithAnswer.code != null) this.containsCode = true;
    this.initialized = true;
  }
}
