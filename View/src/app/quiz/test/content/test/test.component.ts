import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/quiz/shared/services/test.service';
import { Question, QuestionStatus } from 'src/app/quiz/shared/models/classes';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  questions: Question[] = [];
  questions1 = Question;
  questionStatuses: QuestionStatus[] = [];
  status = new QuestionStatus;


  constructor(private testService: TestService, private router:Router, private route:ActivatedRoute) {

  }

  ngOnInit() {
    this.testService.getQuestions().subscribe(x => {
      console.log(x);

      this.questions = x;

      this.questions.forEach(
        question => {
          let  questionStatus = new QuestionStatus();
          questionStatus.id = question.id;
          this.questionStatuses.push(questionStatus);
        }
      );

    });
  }

  public onChange(questionStatus: QuestionStatus) {
    let exist = false;
    let i = 0;
    let id = 0;
    this.questionStatuses.forEach(element => {
        if (element.id === questionStatus.id) {
          //element = answerStatus;
          exist = true;
          id = i;
        }
        i++;
      }
    );

    if (exist) {
      this.questionStatuses[id] = questionStatus;
    }

    
  }

  onSubmit(){
    this.testService.checkAnswers(this.questionStatuses).subscribe(x => 
      { 
        
        this.testService.setResult(x);
        this.router.navigate(['../end'], { relativeTo: this.route });
      });
   
  }


}
