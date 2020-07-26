import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface IBGEUFResponse {
  sigla: string
}
interface IBGECityResponse {
  nome: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  UFs: IBGEUFResponse[];
  cities: IBGECityResponse[];

  selectedUF = new FormControl('')

  selectedCity = new FormControl('')

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUFs();
  }

  loadUFs() {
    this.getIBGEUF().subscribe(ResponseUFs => {
      this.UFs = ResponseUFs
    })
  }

  getIBGEUF(): Observable<IBGEUFResponse[]> {
    return this.http.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }

  loadsCitiess(): void {
    this.getIBGECities().subscribe(ResponseCities => {
      this.cities = ResponseCities
    })
  }

  getIBGECities(): Observable<IBGECityResponse[]> {
    return this.http.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.selectedUF.value}/municipios`);
  }

  goToMapPage(): void {
    if (this.isUFAndCitySet()) {
      this.router.navigate([`/pets/${this.selectedUF.value}/${this.selectedCity.value}`])
    }else{
      this.showMessege('Selecione seu estado e cidade.')
    }
  }

  isUFAndCitySet(): boolean {
    if (this.selectedCity.value && this.selectedUF.value) {
      return true;
    }
    return false;
  }

  showMessege(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: "white"
    })
  }
}
