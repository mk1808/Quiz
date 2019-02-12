import { Component, OnInit } from '@angular/core';

import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.css']
})
export class TestViewComponent implements OnInit {

  constructor(private domSanitizer: DomSanitizer) { } //DomSanitizer używam przy wyświetlaniu obrazka 

  ngOnInit() {
  }
  
public files: UploadFile[] = []; //tablica przechowująca przeciągnięte plliki
private image: any; //obraz w postaci stringa
imageControl:string; //url do obrazka


//metoda przy upuszczaniu pliku na pole
public dropped(event: UploadEvent) { 
  this.files = event.files;
  for (const droppedFile of event.files) {

    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        this.readThis2(file);
        
      });
    } else {
      const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
    }
  }
}


///takie metody są ale ich nie używam
public fileOver(event){
}

public fileLeave(event){
}

//ta metoda używana jest przy przycisku uploadu zdjęcia
changeListener($event): void {
  this.readThis($event.target);
}

//metoda przekształacnia zdjęcia z przycisku
readThis(inputValue: any): void {
  var file: File = inputValue.files[0];
  var myReader: FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
    this.imageControl=''; // kasowanie zawartości pola z url obrazka bo korzystamy z tego przeciągniętego
  }
  myReader.readAsDataURL(file);
}

//metoda przekształcania zdjęcai z przeciągnięcia
readThis2(inputValue: any): void {
  var file: File = inputValue;
  var myReader: FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
    this.imageControl=(''); //kasowanie zawartości... to samo co wcześniej
  }
  myReader.readAsDataURL(file);
}

}
