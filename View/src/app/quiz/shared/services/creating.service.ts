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

    return this.rest.post<any>('/api/subjects/create',    subject);
}

public updateSubject(subject:Subject): Observable<any> { 

  return this.rest.put<any>('/api/subjects/update', subject
 
);
}

public updateQuestion(question:Question): Observable<any> { 
  
  return this.rest.put<any>('/api/questions/update',question );
}

public createQuestion(question:Question): Observable<any> {
  
  return this.rest.post('/api/questions/create', question);
}


public getQuestionById(id): Observable<any> {
  
  return this.rest.get('/api/questions/'+id);
}

public getTests(id): Observable<any> {
  return this.rest.get<Subject[]>('/api/subjects/user/'+ id.toString());
}

public deleteQuestion(id):Observable<any>{
  return this.rest.delete('/api/questions/'+id);
}

public deleteSubject(id):Observable<any>{
  return this.rest.delete('/api/subjects/'+id);
}

public getAnswerStatuses(id): Observable<any> {
  return  this.rest.get<any>('/api/subjects/admin/withAnswers/'+id ) ;
}

public getQuizDetails(id): Observable<any> {
  return  this.rest.get<any>('/api/subjects/admin/withAnswers/'+id ) ;
}

}
