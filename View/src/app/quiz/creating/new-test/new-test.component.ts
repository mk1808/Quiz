import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css']
})
export class NewTestComponent implements OnInit {
  newTestForm: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
