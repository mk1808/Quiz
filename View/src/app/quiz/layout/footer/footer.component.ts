import { Component, OnInit } from '@angular/core';
import { YEAR } from 'ngx-bootstrap/chronos/units/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
year:number;
  constructor() { }
  
  ngOnInit() {
    let date = new Date();
    this.year = date.getFullYear();
  }

}
