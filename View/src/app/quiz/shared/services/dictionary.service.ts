import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Cours, Category } from '../models/classes';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  constructor(private http: HttpClient) { }
  public getCourses(): Observable<Cours[]> {
    return this.http.post<Cours[]>('http://localhost/web/web/api/controllers/dictionary/getCoursesList.php', "");
  }
  public getCategories(): Observable<Category[]> {
    return this.http.post<Category[]>('http://localhost/web/web/api/controllers/dictionary/getCategories.php',"");
  }
}
