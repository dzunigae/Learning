import { Component } from '@angular/core';
import { Product } from 'src/app/objects/product.object';

@Component({
  selector: 'app-product-list.component',
  templateUrl: './product-list.component.component.html',
  styleUrls: ['./product-list.component.component.css'],
})
export class ProductListComponentComponent {
  product1: Product;
  product2: Product;
  product3: Product;
  products: Product[];

  constructor() {
    this.product1 = new Product(
      'Shampoo',
      'Suavitel control caída, caspa y otro montón de cosas.',
      500
    );
    this.product2 = new Product(
      'Soap',
      'Tan suave como el amor de mamá.',
      1800
    );
    this.product3 = new Product(
      'Towel',
      'Como de esas que tenían en las entradas de los almacenes durante pandemia.',
      900
    );
    this.products = [this.product1, this.product2, this.product3];
  }

  share() {
    alert('Funcionalidad no implementada aún');
  }
}
