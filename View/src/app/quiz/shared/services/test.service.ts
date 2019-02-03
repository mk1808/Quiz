import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Question, QuestionStatus, Result, Subject} from '../models/classes';
import {Observable} from 'rxjs/index';
import { CookieService } from 'ngx-cookie-service';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private result = new Result();
  private markTable:number[]=[];
  private questions:QuestionStatus[]= [];

  constructor(private http: HttpClient, private cookie:CookieService,private rest:RestService) { }

  public getQuestions(): Observable<Question[]> {
   
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
  public setMarkTable(table:number[]) {
    this.markTable = table;
  }

  public getMarkTable(): number[] {
    return this.markTable;
  }

  public setQuestionsInResult(questions: QuestionStatus[]) {
    this.questions = questions;
  }

  public getQuestionsInResult():  QuestionStatus[] {
    return this.questions;
  }

  public getQuestionsByIdSubject(id): Observable<any> {
    return this.rest.get<any>('/api/question/answerWS/'+id);
}

  public getRandQuestionsByIdSubject(id): Observable<any> {
    return this.rest.get<any>('/api/question/random/'+id);
  }

  public getQuizDetails(id): Observable<any> {
  return this.rest.get<any>('/api/subject/details/'+id);
}
  public getDemoId(name): Observable<any> {
    return this.http.post<any>('http://localhost/web/web/api/controllers/demo/getDemoId.php',
    JSON.stringify(name),{observe: 'response'});
}
public checkAnswersForDemo(questions: QuestionStatus[]): Observable<any> {

  return  this.http.post<Result>('http://localhost/web/web/api/controllers/checkAnswers.php', 
  JSON.stringify({'questions': questions}));
}

public getAnswerStatuses(id): Observable<any> {

  return  this.rest.get<any>('/api/question/answerWS/'+id ) ;
}

public getQuestionDetails(id): Observable<any> {

  return  this.rest.get<any>('/api/question/WA/'+id) ;
}

public getTestsByCourse(course): Observable<any> {
  return this.rest.get<Subject[]>( '/api/subject/list/course/'+course);
}
}

