import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  public logIn(email:string, password:string): Observable<any> {
    return this.http.post<any>('http://localhost/web/web/api/controllers/auth/login.php', 
    {email:email, password:password},{headers:{"Access-Control-Allow-Origin":"*"}});
}
public register(email:string, password:string, 
  name:string, surname:string, username:string ): Observable<any> {
  return this.http.post<any>('http://localhost/web/web/api/controllers/auth/createUser.php', 
  {email:email, password:password, name:name, surname:surname});
}
}
