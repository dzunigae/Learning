import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/objects/product.object';

@Component({
  selector: 'app-porduct-alert',
  templateUrl: './porduct-alert.component.html',
  styleUrls: ['./porduct-alert.component.css']
})
export class PorductAlertComponent {
  //Permite recibir datos del componente padre
  @Input() product!: Product | undefined;
  @Output() notify = new EventEmitter();
}
