import { Component, AfterViewInit } from '@angular/core';
import * as Leaf from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap()
  }

  private initMap(): void {
    this.map = Leaf.map('map', {
      center: [-25.5614771, -49.3938948],
      zoom: 15
    })
    const tiles = Leaf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map)
  }

  

}
