import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { Subject, User } from '../models/classes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private path:string="http://localhost/web/web/api/controllers/";
  constructor(private http: HttpClient) { }
  public logIn(email:string, password:string): Observable<any> {
    return this.http.post<any>(this.path +'auth/login.php',
      JSON.stringify({email:email, password:password}), {observe: 'response'});
}
public register(user:User ): Observable<any> {
  return this.http.post<any>(this.path +'auth/createUser.php', JSON.stringify(user),
   {observe: 'response'});
}
public getTests(id): Observable<any> {
  return this.http.post<Subject[]> (this.path +'quiz/getQuizListForAuthor.php', JSON.stringify({id:id}
    ),
  {observe: 'response'});
}

public getTestsByCourse(course): Observable<any> {
  return this.http.post<Subject[]> (this.path +'quiz/getQuizForCourse.php', JSON.stringify({id:course}),
  {observe: 'response'});
}
}
