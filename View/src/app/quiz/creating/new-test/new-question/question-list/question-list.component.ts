import { Component, OnInit } from '@angular/core';
import {TestService} from "../../../../shared/services/test.service";
import {Question} from "../../../../shared/models/classes";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  idSubject:string;
  questions: Question[] = [];

  constructor(private testService: TestService,  private cookie:CookieService) { }

  ngOnInit() {
 
    this.idSubject=this.cookie.get('idSubject');
    this.testService.getQuestionsByIdSubject(this.idSubject).subscribe(x => {
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
