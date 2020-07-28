import { Component, AfterViewInit } from '@angular/core';
import { MapService } from './map.service';
import * as Leaf from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  constructor(private mapService: MapService) { }

  private map:any;

  async ngAfterViewInit(): Promise<any> {
    this.map = await this.mapService.initMap()
    this.initPoints();
  }

  initPoints(): void {
    const myIcon = Leaf.icon({
      iconUrl: './../../../assets/image/pets-icons.svg',
      className: 'pet-point',

    })

    const marker = Leaf.marker([-25.5680148, -49.3912029], { icon: myIcon, interactive: true, })

    marker.addTo(this.map)
  }

}
