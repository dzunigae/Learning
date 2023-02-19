//Archivo de enrutamiento principal
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponentComponent } from './components/product-list.component/product-list.component.component';

const routes: Routes = [
  { path: 'ecommerce', component: ProductListComponentComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
