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
      JSON.stringify({email:email, password:password}));
}
public register(email:string, password:string,
  name:string, surname:string, username:string ): Observable<any> {
  return this.http.post<any>('http://localhost/web/web/api/controllers/auth/createUser.php',
    JSON.stringify({email:email, password:password, name:name, surname:surname}));
}
}
