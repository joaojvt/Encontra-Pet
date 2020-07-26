import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {

  constructor() { }
  latitude: number = -25.5614771;
  longitude: number = -49.3938948;

  ngOnInit() {

  }


}
