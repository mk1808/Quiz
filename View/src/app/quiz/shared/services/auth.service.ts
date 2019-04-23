import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Subject, User } from '../models/classes';
import { CookieService } from 'ngx-cookie-service';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private path: string = "http://localhost/web/web/api/controllers/";
  constructor(private http: HttpClient, private cookie: CookieService, private rest:RestService) { }
  public logIn(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('/api/login',
      user, httpOptions);
  }
  public register(user: User): Observable<any> {
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('/api/register', user, httpOptions);
  }
  

  

  public updateUser(user, token): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' +token
      })
    };
    return this.http.put('/api/updateUser', user, httpOptions);
  }

  public deleteUser(id):Observable<any>{
    return this.rest.delete('/api/user/'+id);
  }
  
  public getUserList(email,course,name,surname): Observable<User[]>{
    return this.rest.get('/api/usersList/'+email+'=/'+name+'=/'+surname+'=/'+course+'=');
  }

  public updateUserByTeacher(user:User): Observable<User>{
    return this.rest.put('/api/user',user);
  }

  public updateUserBySelf(user:User): Observable<any>{
    return this.rest.put('/api/userOwn',user);
  }

  public getUserDetails(id): Observable<any>{

    return this.rest.get('/api/user/'+id);
  }


}
