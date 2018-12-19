export class Subject {
  id: number;
  name: string;
  idAuthor: number;
  nOQuestions: number;
  multipleChoice: boolean;
  separatePage: boolean=false;
  canBack: boolean=false;
  limitedTime: boolean;
  time: number;
  course: string;
  description: string;

}

export class Question {
  id: number;
  category: string;
  idSubject:string;
  text: string;
  code: string;
  image: string;
  answers: Answer[]=[];
}

export class Answer {
  id: number;
  text: string;
  idQuestion:number;
  status:boolean;
}

export class AnswerStatus {
  id: number;
  value: number;
}

export class QuestionStatus {
  id: number;
  answers: AnswerStatus[]=[];
}

export class Result {
  total: number;
  true: number;
}

export class User{
  id:number;
  name:string;
  surname:string;
  email:string;
  password:string;
  role:number;
  course:string;
}
export class UserResult {
  id: number;
  idUser: number;
  idSubject: number;
  result: number;
}

export class Category {
  ID: number;
  NAME: string;
}

export interface Cours {
  ID: number;
  NAME: string;
}
