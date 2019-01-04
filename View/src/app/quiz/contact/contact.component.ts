/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  latitude: number;
  longitude: number;

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  

  constructor() { }

  ngOnInit() {

    var mapProp = {
      center: new google.maps.LatLng(50.026783, 21.984447),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    var marker = new google.maps.Marker({
      position: {lat: 50.026783, lng: 21.984447},
      map: this.map
  });
  }

}
