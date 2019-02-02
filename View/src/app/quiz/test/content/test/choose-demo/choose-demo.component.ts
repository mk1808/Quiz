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
  tests: string[] = ["Test z technologii sieci WEB", "Test z języka Java"]
  ngOnInit() {
    if (this.cookie.get('user') == "") {

    }
  }

  onTest(id: string) {
    
    if (id=="1"){
    this.router.navigate(['/quiz/demo/java/begin']);
    
  }
  else {
    this.router.navigate(['/quiz/demo/web/begin']);
  }
}
}
