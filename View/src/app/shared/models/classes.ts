export class Subject{
  id:number;
  name: string;
}

export class Question{
  id:number;
  category: string;
  text:string;
  code:string;
  image:string;
  answer:Answer[];
}

export class Answer{
  id:number;
  text:string;
}
