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
  quizName:string;
  constructor(private testService: TestService,  private cookie:CookieService,
    private test:TestService) { }

  ngOnInit() {
 
    this.idSubject=this.cookie.get('idSubject');
    this.testService.getAnswerStatuses(this.idSubject).subscribe(x => {
      if(x.status==200){
        x=x.body;
      this.questions = x;
      console.log(x);
    }});
    this.test.getQuizDetails(this.idSubject).subscribe(x=>{
      if(x.status==200){
        x=x.body;
      this.quizName=x.NAME;
      console.log(x);
   } });
 // this.test.getAnswerStatuses(this.idSubject).subscribe(x=>
   // {
     // console.log("stat  ",x.body);
    //})
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
