export class Subject {
  id: number;
  name: string;
}

export class Question {
  id: number;
  category: string;
  text: string;
  code: string;
  image: string;
  answers: Answer[];
}

export class Answer {
  id: number;
  text: string;
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

export interface User{
  id:number,
  name:string,
  surname:string,
  email:string,
  password:string,
  role:number
}