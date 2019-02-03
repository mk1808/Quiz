import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Cours, Category } from '../models/classes';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  constructor(private http: HttpClient,private rest:RestService) { }
  public getCourses(): Observable<Cours[]> {
    return this.rest.get<Cours[]>('/api/courses');
  }
  public getCategories(): Observable<Category[]> {
    return this.http.post<Category[]>('http://localhost/web/web/api/controllers/dictionary/getCategories.php',"");
  }
}
