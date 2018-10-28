import { Component, OnInit } from '@angular/core';
import {TestService} from "../shared/services/test.service";
import {Question} from "../shared/models/classes";

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
      console.log(this.obj);
    });
  }

}
