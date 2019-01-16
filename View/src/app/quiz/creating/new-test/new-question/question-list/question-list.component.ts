import { Component, OnInit } from '@angular/core';
import {TestService} from "../../../../shared/services/test.service";
import {Question} from "../../../../shared/models/classes";
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private test:TestService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
 
    this.idSubject=this.cookie.get('idSubject');
    this.testService.getAnswerStatuses(this.idSubject).subscribe(x => {
      if(x.status==200){
        x=x.body;
        x.forEach(element => {
          let text = element.text;
          if(text!=null){
          while(text.indexOf('”')>=0)   {
            text = text.replace("”",'"');
          }
          while(text.indexOf("字")>=0)   {
            text = text.replace("字","<");
          }
          while(text.indexOf("汉")>=0)   {
            text = text.replace("汉",">");
          }
          element.text = text;
        }

        element.answers.forEach(answer=>{
          if(answer!=null){
            while(answer.text.indexOf('”')>=0)   {
              answer.text = answer.text.replace("”",'"');
            }
            while(answer.text.indexOf("字")>=0)   {
              answer.text =answer.text.replace("字","<");
            }
            while(answer.text.indexOf("汉")>=0)   {
              answer.text = answer.text.replace("汉",">");
            }
          }
        })
        });
       
      this.questions = x;
    }});
    this.test.getQuizDetails(this.idSubject).subscribe(x=>{
      if(x.status==200){
        x=x.body;
      this.quizName=x.NAME;
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

  onChange(i){
    this.router.routeReuseStrategy.shouldReuseRoute=function(){return false};
    this.router.navigateByUrl('/creating/new_test/edit_question/' + i).then(()=>{
      this.router.navigated = false;
      this.router.navigate(['/creating/new_test/edit_question/' + i])
    })
  }

}
