import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-begin',
  templateUrl: './test-begin.component.html',
  styleUrls: ['./test-begin.component.css']
})
export class TestBeginComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute) { 
    
  }

  ngOnInit() {
  }

  onSubmit(){
    this.router.navigate(['../test'], { relativeTo: this.route });
  }
}
