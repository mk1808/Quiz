import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logout-alert',
  templateUrl: './logout-alert.component.html',
  styleUrls: ['./logout-alert.component.css']
})
export class LogoutAlertComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }
}
