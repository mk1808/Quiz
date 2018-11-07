import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from 'src/app/shared/services/test.service';
import { Result } from 'src/app/shared/models/classes';

@Component({
  selector: 'app-test-end',
  templateUrl: './test-end.component.html',
  styleUrls: ['./test-end.component.css']
})
export class TestEndComponent implements OnInit {
  total:number;
  true:number;
  isPassed:boolean;
  truePercent:number;
  constructor(private testService: TestService, private router:Router) { }

  ngOnInit(
  ) {
    let result:Result= this.testService.getResult();
    this.total=result.total;
    this.true=result.true;
    this.truePercent=this.true/this.total*100;
    this.isPassed=this.truePercent>=50;
    console.log("total:"+this.total+" true:"+this.true+" procent:"+this.truePercent+ " "+this.isPassed);

    console.log(this.testService.getResult());
   
  }

}
