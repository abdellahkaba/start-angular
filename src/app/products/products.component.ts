import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products! : Array<any>
  constructor() {
  }
  ngOnInit(): void {
    this.products = [
      {id: 1, name : "Computer", price : 2000},
      {id: 2, name : "Iphone", price : 3000},
      {id: 3, name : "Tablette", price : 2500},
    ]
  }

  handleDeleteProduct(p: any) {
    //donne moi la position de l'index
    let index = this.products.indexOf(p);
    //je supprime un seul element a partir de l'index
    this.products.splice(index,1)
  }
}
