import { Injectable } from '@angular/core';
import * as Leaf from 'leaflet';

@Injectable({
  providedIn: 'root'
})

export class MapService {
  private cuurentLat: number = -23.5708334;
  private currentLng: number = -46.6739579;


  constructor() { }

  public async initMap(): Promise<Leaf.Map> {

    await this.getCurrentLocation().then(pos => {
      this.cuurentLat = pos.currentLat;
      this.currentLng = pos.currentLng;
    })

    const map = Leaf.map('map', {
      center: [this.cuurentLat, this.currentLng],
      zoom: 14
    })
    const tiles = Leaf.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=4r0T518xqSFFtEihF5Rv', {
      maxZoom: 16,
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    });

    tiles.addTo(map)
    return map

  }

  getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ currentLng: resp.coords.longitude, currentLat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }
}
