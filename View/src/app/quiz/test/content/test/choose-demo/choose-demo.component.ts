import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-choose-demo',
  templateUrl: './choose-demo.component.html',
  styleUrls: ['./choose-demo.component.css']
})
export class ChooseDemoComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
    private cookie: CookieService) { }

  ngOnInit() {
    if (this.cookie.get('user') == "") {

    }
  }

  onTestJava() 
  {  this.router.navigate(['/quiz/demo/demojava/begin']);}
  onTestWeb()
  { this.router.navigate(['/quiz/demo/demoweb/begin']);}
    
 
}
