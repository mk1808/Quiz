import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question, QuestionStatus, Result, Subject } from '../models/classes';
import { Observable } from 'rxjs/index';
import { CookieService } from 'ngx-cookie-service';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private result = new Result();
  private markTable: number[] = [];
  private questions: QuestionStatus[] = [];

  constructor(private http: HttpClient, private cookie: CookieService, private rest: RestService) { }

  public getQuestions(): Observable<Question[]> {

    return this.http.post<Question[]>('http://localhost/web/web/api/controllers/getQuestionsQndAnswers.php',
      { observe: 'response' });
  }

  public checkAnswers(questions: Question[]): Observable<any> {

    return this.rest.post<Result>('/api/subjects/result', questions);
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

  public getQuestionsInResult(): QuestionStatus[] {
    return this.questions;
  }

  public getQuestionsByIdSubject(id): Observable<any> {
    return this.rest.get<any>('/api/question/answerWS/' + id);
  }

  public getQuestionsByIdSubjectWOStatus(id): Observable<any> {
    return this.rest.get<any>('/api/subjects/withoutAnswers/' + id);
  }

  public getQuestionsByIdSubjectDemoWOStatus(id): Observable<any> {
    return this.rest.get<any>('/api/subjects/demo/withoutAnswers/' + id);
  }

  public getRandQuestionsByIdSubject(id): Observable<any> {
    return this.rest.get<any>('/api/subjects/withoutAnswers/' + id);
  }

  public getQuizDetails(id): Observable<any> {
    return this.rest.get<any>('/api/subjects/withoutAnswers/' + id);
  }

  public getQuizDemoDetails(id): Observable<any> {
    return this.rest.get<any>('/api/subjects/demo/withAnswers/' + id);
  }

  public getDemoId(name): Observable<any> {
    return this.rest.get<any>('/api/subjects/demo/withoutAnswers/' + name);
  }
  public checkAnswersForDemo(questions: Question[]): Observable<any> {
    return this.rest.post<Result>('/api/subjects/demo/result', questions);
  }

  public getAnswerStatuses(id): Observable<any> {
    return this.rest.get<any>('/api/subjects/withAnswers/' + id);
  }

  public getQuestionDetails(id): Observable<any> {
    return this.rest.get<any>('/api/question/WA/' + id);
  }

  public getQuestionDetailsDemo(id): Observable<any> {
    return this.rest.get<any>('/api/question/demo/WA/' + id);
  }

  public getTestsByCourse(course): Observable<any> {
    return this.rest.get<Subject[]>('/api/subjects/' + course);
  }

  public getUserResultForQuiz(idUser): Observable<any> {
    return this.rest.get('/api/subject/result/' + idUser);
  }
}

