export interface Answer {
  id: number;
  idQuestion: number;
  text: string;
  status: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export interface Cours {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  idSubject: number;
  idCategory: number;
  text: string;
  code: string;
  image: string;
}

export interface Subject {
  id: number;
  name: string;
  idAuthor: number;
  nOQuestions: number;
  multipleChoice: boolean;
  separatePage: boolean;
  canBack: boolean;
  limitedTime: boolean;
  time: number;
  course: string;
  description: string;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: number;
}

export interface UserResult {
  id: number;
  idUser: number;
  idSubject: number;
  result: number;
}
