import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Question, QuestionStatus, Result} from "../models/classes";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  public getQuestions():Observable<Question[]>{
      return this.http.get<Question[]>("http://localhost/web/web/api/controllers/getQuestionsQndAnswers.php");
  }

  public checkAnswers(questions:QuestionStatus[]): Observable<any>{
    let questions2 = JSON.stringify({"questions":questions});
    //console.log({"questions":questions});
    let headers = new HttpHeaders({
      'Content-Type': 'application/json' });
    let options = { headers: headers };
      return this.http.post<any>("http://localhost:80/web/web/api/controllers/checkAnswers.php",questions2);
  }
}
