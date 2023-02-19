import { Component } from '@angular/core';

@Component({
  selector: 'app-primera-prueba',
  templateUrl: './primera-prueba.component.html',
})
export class PrimeraPruebaComponent {
  //Las variables se pasan al HTML relacionado con el componente.
  message = 'Esto es un mensaje';
  message2 = 'Este mensaje se muestra en un alert';
  canClick = false;
  sayHelloId = 'Hola';
  fontColor = 'Red';
  sayMessage() {
    alert(this.message2);
    this.canClick = true;
  }
}
