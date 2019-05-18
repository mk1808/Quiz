export class Subject {
  id: number;
  name: string;
  idAuthor: number;
  nOQuestions: number;
  noQuestions: number;
  multipleChoice: boolean;
  separatePage: boolean=false;
  canBack: boolean=false;
  randomize: boolean=false;
  limitedTime: boolean;
  time: number;
  course: string;
  description: string;
  jwt:string;
  subject:string;
  questions:Question[];
}

export class Question {
  id: number;
  category: string;
  idSubject:string;
  text: string;
  code: string;
  image: string;
  answers: Answer[]=[];
  jwt:string;
}

export class Answer {
  id: number;
  text: string;
  idQuestion:number;
  status:string;
}

export class AnswerStatus {
  id: number;
  status: number|boolean;
}

export class QuestionStatus {
  id: number;
  answers: AnswerStatus[]=[];
}

export class Result {
  total: number;
  correct: number;
}

export class User{
  id:number;
  username:string;
  name:string;
  surname:string;
  email:string;
  password:string;
  role:number|string|Role;
  course:string;
  jwt:string;
  c_password:string;
}

export class Role{
  id:number;
  name:string;
}

export class UserResult {
  id: number;
  idUser: number;
  idSubject: number;
  result: number;
}

export class SignInForm{
  username:string;
  password:string;
}
export class SignUpForm{
  name:string;
  username:string;
  email:string;
  role:string;
  password:string;
  surname:string;
  course:string;
}

export class Category {
  ID: number;
  NAME: string;
}

export interface Cours {
  ID: number;
  NAME: string;
}
