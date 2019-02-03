import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Subject, User } from '../models/classes';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RestService {
    
constructor(private http: HttpClient, private cookieService: CookieService) { }
    post<T>(url:string, body:any):Observable<T>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Bearer ' +this.cookieService.get('token')
          })
        };
        return this.http.post<T>(url,body,httpOptions);
    }

    get<T>(url:string):Observable<T>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' +this.cookieService.get('token')
          })
        };
        return this.http.get<T>(url,httpOptions);
    }

    put<T>(url:string, body:any):Observable<T>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Bearer ' +this.cookieService.get('token')
          })
        };
        return this.http.put<T>(url,body,httpOptions);
    }

    delete<T>(url:string):Observable<T>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' +this.cookieService.get('token')
          })
        };
        return this.http.delete<T>(url,httpOptions);
    }
}
