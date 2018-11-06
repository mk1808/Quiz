import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-begin',
  templateUrl: './test-begin.component.html',
  styleUrls: ['./test-begin.component.css']
})
export class TestBeginComponent implements OnInit {

  constructor(private router:Router) { 
    
  }

  ngOnInit() {
  }

  onSubmit(){
    this.router.navigate(['/test']);
  }
}
