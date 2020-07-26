import { PetListComponent } from './components/pet/pet-list/pet-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';


const routes: Routes = [
  { path: '',  component: HomeComponent},
  { path: 'pets/:uf/:city',  component: PetListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
