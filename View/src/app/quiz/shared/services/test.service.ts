import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Question, QuestionStatus, Result} from '../models/classes';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private result = new Result();

  constructor(private http: HttpClient) { }

  public getQuestions(): Observable<Question[]> {
      return this.http.post<Question[]>('http://localhost/web/web/api/controllers/getQuestionsQndAnswers.php',
       {observe: 'response'});
  }

  public checkAnswers(questions: QuestionStatus[], idUser, idSubject): Observable<any> {
    return  this.http.post<Result>('http://localhost/web/web/api/controllers/question/checkAnswers.php', JSON.stringify({'questions': questions, 'idUser':idUser, 'idSubject':idSubject}));
  }

  public setResult(result: Result) {
    this.result = result;
  }

  public getResult(): Result {
    return this.result;
  }

  public getQuestionsByIdSubject(id): Observable<any> {
    return this.http.post<any>('http://localhost/web/web/api/controllers/question/getQuestionsWithAnswersForQuiz.php',
     JSON.stringify({id:id}
    ),{observe: 'response'});
}

  public getRandQuestionsByIdSubject(id): Observable<any> {
    return this.http.post<any>('http://localhost/web/web/api/controllers/question/getRandomQuestionsForQuiz.php',  
    JSON.stringify({id:id}),{observe: 'response'});
  }

  public getQuizDetails(id): Observable<any> {
  return this.http.post<any>('http://localhost/web/web/api/controllers/quiz/getQuizDetails.php?',
  JSON.stringify({id:id}
    ),{observe: 'response'});
}
}
