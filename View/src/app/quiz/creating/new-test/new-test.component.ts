import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css']
})
export class NewTestComponent implements OnInit {
  newTestForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    nOQuestions: ['', Validators.required],
    limitedTime: [false],
    multipleChoice: ['Krotność', Validators.required],
    time: [''],
    course: ['Kierunek studiów'],
    description: [''  ],
  });
  limitedTime: boolean=false;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newTestForm.controls.time.disable();
  }
  
  onClickLimitedTime(){
    if (!this.newTestForm.controls.limitedTime.value)
    {
      this.newTestForm.controls.time.enable();
    }
    else {this.newTestForm.controls.time.disable();}
  }
}
