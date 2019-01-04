import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Question, QuestionStatus, Result} from '../models/classes';
import {Observable} from 'rxjs/index';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private result = new Result();
  private questions:QuestionStatus[]= [];

  constructor(private http: HttpClient, private cookie:CookieService) { }

  public getQuestions(): Observable<Question[]> {
      //depreciated
      return this.http.post<Question[]>('http://localhost/web/web/api/controllers/getQuestionsQndAnswers.php',
       {observe: 'response'});
  }

  public checkAnswers(questions: QuestionStatus[], idUser, idSubject): Observable<any> {

    return  this.http.post<Result>('http://localhost/web/web/api/controllers/question/checkAnswers.php', 
    JSON.stringify({'questions': questions, 'idUser':idUser, 'idSubject':idSubject,  jwt:this.cookie.get("jwt")}));
  }

  public setResult(result: Result) {
    this.result = result;
  }

  public getResult(): Result {
    return this.result;
  }

  public setQuestionsInResult(questions: QuestionStatus[]) {
    this.questions = questions;
  }

  public getQuestionsInResult():  QuestionStatus[] {
    return this.questions;
  }

  public getQuestionsByIdSubject(id): Observable<any> {
    return this.http.post<any>('http://localhost/web/web/api/controllers/question/getQuestionsWithAnswersForQuiz.php',
     JSON.stringify({id:id,  jwt:this.cookie.get("jwt")}
    ),{observe: 'response'});
}

  public getRandQuestionsByIdSubject(id): Observable<any> {
    return this.http.post<any>('http://localhost/web/web/api/controllers/question/getRandomQuestionsForQuiz.php',  
    JSON.stringify({id:id, jwt:this.cookie.get("jwt")}),{observe: 'response'});
  }

  public getQuizDetails(id): Observable<any> {
  return this.http.post<any>('http://localhost/web/web/api/controllers/quiz/getQuizDetails.php',
  JSON.stringify({id:id, jwt:this.cookie.get("jwt")}
    ),{observe: 'response'});
}
  public getDemoId(): Observable<any> {
    return this.http.post<any>('http://localhost/web/web/api/controllers/demo/getDemoId.php',
    "",{observe: 'response'});
}
public checkAnswersForDemo(questions: QuestionStatus[]): Observable<any> {

  return  this.http.post<Result>('http://localhost/web/web/api/controllers/checkAnswers.php', 
  JSON.stringify({'questions': questions}));
}

public getAnswerStatuses(id): Observable<any> {

  return  this.http.post<any>('http://localhost/web/web/api/controllers/question/getAnswerWithStatusForQuiz.php', 
  JSON.stringify({id:id, jwt:this.cookie.get("jwt")}),{observe: 'response'}) ;
}

public getQuestionDetails(id): Observable<any> {// TUTAJ tego będziesz potrzebować

  return  this.http.post<any>('http://localhost/web/web/api/controllers/question/getQuestionWithAnswers.php', 
  JSON.stringify({id:id, jwt:this.cookie.get("jwt")}),{observe: 'response'}) ;
}
}

