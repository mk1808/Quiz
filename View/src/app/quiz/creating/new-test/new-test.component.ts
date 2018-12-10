import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subject, Cours } from '../../shared/models/classes';
import { DictionaryService } from '../../shared/services/dictionary.service';
import { CreatingService } from '../../shared/services/creating.service';


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
    multipleChoice: ['Krotność wyboru', Validators.required],
    time: [''],
    course: ['Kierunek studiów'],
    description: [''  ],
  });
  limitedTime: boolean=false;
  coursesTable:Cours[]=[];
  constructor(private fb: FormBuilder,private dictionary:DictionaryService, private creating:CreatingService ) { }

  ngOnInit() {
    this.newTestForm.controls.time.disable();
    this.dictionary.getCourses().subscribe( x =>
      {
        console.log(x[1].NAME);
        this.coursesTable=x;
      })
  }
  
  onClickLimitedTime(){
    if (!this.newTestForm.controls.limitedTime.value)
    {
      this.newTestForm.controls.time.enable();
    }
    else {this.newTestForm.controls.time.disable();}
  }

  onCreate(){
    if (this.newTestForm.valid)
    {
      
      let subject = new Subject();
      if (this.newTestForm.controls.limitedTime){
        subject.time=(this.newTestForm.controls.time.value.split(":")[0])*60
        +this.newTestForm.controls.time.value.split(":")[1]*1;
        
      }

      subject.id=2;
      subject.idAuthor=1;
      subject.description=this.newTestForm.controls.description.value;
      subject.name=this.newTestForm.controls.name.value;
      if (this.newTestForm.controls.multipleChoice.value=="jednokrotny"){
        subject.multipleChoice=false;
      }
      else {
        subject.multipleChoice=true;
      }
    
      subject.limitedTime=this.newTestForm.controls.limitedTime.value;
      
      subject.course=this.newTestForm.controls.course.value;
      subject.nOQuestions=this.newTestForm.controls.nOQuestions.value;
      this.creating.createSubject(subject).subscribe(x=> console.log(x), e=>console.log(e));
    }
  }
}