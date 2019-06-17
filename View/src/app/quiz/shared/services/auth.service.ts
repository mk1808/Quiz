import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Subject, User, SignUpForm, SignInForm } from '../models/classes';
import { CookieService } from 'ngx-cookie-service';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private path: string = "http://localhost/web/web/api/controllers/";
  constructor(private http: HttpClient, private cookie: CookieService, private rest:RestService) { }
  public logIn(user: SignInForm): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('/api/auth/signin',
      user, httpOptions);
  }

  public register(user: SignUpForm): Observable<any> {
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('/api/auth/signup', user, {observe: 'response'});
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
    return this.rest.delete('/api/users/'+id);
  }
  
  public getUserList(email,course,name,surname): Observable<User[]>{
    return this.rest.get('/api/users')///'+email+'=/'+name+'=/'+surname+'=/'+course+'=');
  }

  public updateUserByTeacher(user:User): Observable<User>{
    return this.rest.put('/api/users/admin/update',user);
  }

  public updateUserBySelf(user:User): Observable<any>{
    return this.rest.put('/api/users/update',user);
  }

  public getUserDetails(id): Observable<any>{

    return this.rest.get('/api/users/'+id);
  }


}
