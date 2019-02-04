import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { Subject, Question } from '../models/classes';
import { CookieService } from 'ngx-cookie-service';
import { RestService } from './rest.service';


@Injectable({
  providedIn: 'root'
})
export class CreatingService {

  constructor(private http: HttpClient, private cookie:CookieService, private rest:RestService) { }

  public createSubject(subject:Subject): Observable<any> {

    return this.rest.post<any>('/api/subject',    subject);
}

public updateSubject(subject:Subject): Observable<any> { 

  return this.rest.put<any>('/api/subject', subject
 
);
}

public updateQuestion(question:Question): Observable<any> { 
  
  return this.rest.put<any>('/api/question',question );
}

public createQuestion(question:Question): Observable<any> {
  
  return this.rest.post('/api/question', question);
}


public getTests(id): Observable<any> {
  return this.rest.get<Subject[]>('/api/subject/list/author/'+ id.toString());
}

public deleteQuestion(id):Observable<any>{
  return this.rest.delete('/api/question/'+id);
}

public deleteSubject(id):Observable<any>{
  return this.rest.delete('/api/subject/'+id);
}
}
