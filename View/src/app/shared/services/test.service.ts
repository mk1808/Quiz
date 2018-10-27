import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Question} from "../models/classes";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  public getQuestions():Observable<Question[]>{
      return this.http.get<Question[]>("http://localhost/web/web/api/controllers/getQuestionsQndAnswers.php");
  }
}
