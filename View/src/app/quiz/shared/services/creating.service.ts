import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { Subject, Question } from '../models/classes';


@Injectable({
  providedIn: 'root'
})
export class CreatingService {

  constructor(private http: HttpClient) { }
  public createSubject(subject:Subject): Observable<Subject> {
    return this.http.post<any>('http://localhost/web/web/api/controllers/quiz/createSubject.php',
    JSON.stringify(subject),
    {headers:{"Access-Control-Allow-Origin":"*"}});
}

public createQuestion(question:Question): Observable<any> {
  
  return this.http.post('http://localhost/web/web/api/controllers/question/createQuestion.php',
  JSON.stringify(question));
}
}
