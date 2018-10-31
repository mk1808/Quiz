import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/shared/services/test.service';
import { Question } from 'src/app/shared/models/classes';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  questions:Question[]=[];
  questions1=Question;
  constructor(private testService:TestService) { 
    
  }

  ngOnInit() {
    this.testService.getQuestions().subscribe(x=>{
      console.log(x);

      this.questions=x.questions;
    });
  }

}
