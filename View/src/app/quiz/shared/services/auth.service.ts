import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { Subject } from '../models/classes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  public logIn(email:string, password:string): Observable<any> {
    return this.http.post<any>('http://localhost/web/web/api/controllers/auth/login.php',
      JSON.stringify({email:email, password:password}));
}
public register(email:string, password:string,
  name:string, surname:string, username:string ): Observable<any> {
  return this.http.post<any>('http://localhost/web/web/api/controllers/auth/createUser.php',
    JSON.stringify({email:email, password:password, name:name, surname:surname}));
}
public getTests(id): Observable<Subject[]> {
  return this.http.get<Subject[]>
  ('http://localhost/web/web/api/controllers/quiz/getQuizListForAuthor.php?id='+ id);
}

public getTestsByCourse(course): Observable<Subject[]> {
  return this.http.get<Subject[]>
  ('http://localhost/web/web/api/controllers/quiz/getQuizForCourse.php?id='+ course);
}
}
