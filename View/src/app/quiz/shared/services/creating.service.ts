import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { Subject, Question } from '../models/classes';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class CreatingService {

  constructor(private http: HttpClient, private cookie:CookieService) { }

  public createSubject(subject:Subject): Observable<any> {
    subject.jwt = this.cookie.get("jwt");
    return this.http.post<any>('http://localhost/web/web/api/controllers/quiz/createSubject.php',
    JSON.stringify(subject),
    {observe: 'response'});
}

public updateSubject(subject:Subject): Observable<any> { 
  subject.jwt = this.cookie.get("jwt");
  return this.http.post<any>('http://localhost/web/web/api/controllers/quiz/updateSubject.php',
  JSON.stringify(subject),
  {observe: 'response'});
}

public updateQuestion(question:Question): Observable<any> { 
  question.jwt = this.cookie.get("jwt");
  return this.http.post<any>('http://localhost/web/web/api/controllers/question/updateQuestion.php',
  JSON.stringify(question),
  {observe: 'response'});
}

public createQuestion(question:Question): Observable<any> {
  question.jwt = this.cookie.get("jwt");
  return this.http.post('http://localhost/web/web/api/controllers/question/createQuestion.php',
  JSON.stringify(question),
  {observe: 'response'});
}
}
