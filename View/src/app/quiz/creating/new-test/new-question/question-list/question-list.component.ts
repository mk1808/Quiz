import { Component, OnInit } from '@angular/core';
import {TestService} from "../../../../shared/services/test.service";
import {Question} from "../../../../shared/models/classes";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions: Question[] = [];

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService.getQuestions().subscribe(x => {
      this.questions = x;
    });
  }

  collapse(i){
    if(document.getElementById('question'+i).classList.contains("quizShow")){
      document.getElementById('question'+i).classList.remove('quizShow');
    }
    else {
      document.getElementById('question'+i).classList.add('quizShow');

    }
  }

}
