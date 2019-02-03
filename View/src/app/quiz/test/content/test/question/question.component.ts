import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Question, AnswerStatus, QuestionStatus } from 'src/app/quiz/shared/models/classes';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question: Question;
  status = new QuestionStatus;
  containsPhoto:boolean;
  questionNumber:number=0;
 
  containsCode:boolean;
  @Output() questionStatus = new EventEmitter<QuestionStatus>();
  @Input() number;
  @Input() set setQuestion(question: Question) {
    this.question = question;
    this.status.id = question.id;

    
      let text = this.question .text;
      if(text!=null){
      while(text.indexOf('”')>=0)   {
        text = text.replace("”",'"');
      }
      while(text.indexOf("字")>=0)   {
        text = text.replace("字","<");
      }
      while(text.indexOf("汉")>=0)   {
        text = text.replace("汉",">");
      }
      this.question .text = text;
    }

    let code = this.question .code;
      if(code!=null){
      while(code.indexOf('”')>=0)   {
        code = code.replace("”",'"');
      }
      while(code.indexOf("字")>=0)   {
        code = code.replace("字","<");
      }
      while(code.indexOf("汉")>=0)   {
        code = code.replace("汉",">");
      }
      this.question.code = code;
    }

    this.question.answers.forEach(answer=>{
      if(answer!=null){
        while(answer.text.indexOf('”')>=0)   {
          answer.text = answer.text.replace("”",'"');
        }
        while(answer.text.indexOf("字")>=0)   {
          answer.text =answer.text.replace("字","<");
        }
        while(answer.text.indexOf("汉")>=0)   {
          answer.text = answer.text.replace("汉",">");
        }
      }
    })

   if ((question.image!=null) && (question.image!=undefined) && (question.image!=""))
    this.containsPhoto=true;
   if (question.code!="") this.containsCode=true;
    question.answers.forEach(
      answer => {
      const  answerStatus = new AnswerStatus();
        answerStatus.id = answer.id;
        answerStatus.value = 0;
        this.status.answers.push(answerStatus);
        
      }
    );
    
    this.questionStatus.emit(this.status);
  }

  constructor() {

  }

  public onChange(answerStatus: AnswerStatus) {
    let exist = false;
    let i = 0;
    let id = 0;
    this.status.answers.forEach(element => {
        if (element.id === answerStatus.id) {
          //element = answerStatus;
          exist = true;
          id = i;
        }
        i++;
      }
    );

    if (exist) {
      this.status.answers[id] = answerStatus;
    }
    this.questionStatus.emit(this.status);
    
  }

  ngOnInit() {
    
  }

  public getStatus(id: number) {
    /*
     if(document.readyState)
     {
     if (this.colors[id]!='white'){
     this.colors[id]= 'white';
     }
     else{
     this.colors[id]= '#649494';
     }
     } */
  }
}
