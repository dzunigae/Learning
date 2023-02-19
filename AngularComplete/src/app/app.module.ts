import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeraPruebaComponent } from './components/primera-prueba/primera-prueba.component';
import { IntroduccionDirectivasComponent } from './components/introduccion-directivas/introduccion-directivas.component';
import { DependencyInjectionLogerComponent } from './components/dependency-injection.loger/dependency-injection.loger.component';
import { ProductListComponentComponent } from './components/product-list.component/product-list.component.component';
import { HomeComponent } from './components/home/home.component';
import { PorductAlertComponent } from './components/porduct-alert/porduct-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    PrimeraPruebaComponent,
    IntroduccionDirectivasComponent,
    DependencyInjectionLogerComponent,
    ProductListComponentComponent,
    HomeComponent,
    PorductAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
