import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products! : Array<any>
  errorMessage! : string

  //on aura besoin d'utiliser notre service en l'injectant dans le constructeur
  constructor(private productService : ProductService) {
  }
  //on l'utilise dans ngOnInit en retourant un objet de type observable
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      //des que la donnees arrive ?
      next : (data) => {
        this.products = data
      },
      //Au cas ou sa retourne un message d'errors
      error : (err) => {
        this.errorMessage = err ;
      }
    });
  }

  handleDeleteProduct(p: any) {
    //donne moi la position de l'index
    let index = this.products.indexOf(p);
    //je supprime un seul element a partir de l'index
    this.products.splice(index,1)
  }
}
