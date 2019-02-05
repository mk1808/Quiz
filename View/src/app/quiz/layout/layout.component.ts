import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, AfterViewChecked, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit,AfterContentChecked {
  height=0;
  @ViewChild('header') header:ElementRef;
  @ViewChild('footer') footer:ElementRef;
  @ViewChild('content') content;
  constructor() { }

  ngOnInit() {
    
  }

  ngAfterContentChecked(){
    this.height=(window.innerHeight-this.header.nativeElement.scrollHeight-this.footer.nativeElement.scrollHeight-50);
  }

}
