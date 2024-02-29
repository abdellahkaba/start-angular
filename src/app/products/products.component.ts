import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products! : Array<Product>
  errorMessage! : string

  //on aura besoin d'utiliser notre service en l'injectant dans le constructeur
  constructor(private productService : ProductService) {
  }
  //on l'utilise dans ngOnInit en retourant un objet de type observable
  ngOnInit(): void {
    this.handleGetAllProducts();
  }
  //une methode retourne les produits
  handleGetAllProducts (){
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
    this.productService.deleteProduct(p.id).subscribe({
      next : (data) => {
         // this.handleGetAllProducts()
        //on supprime l'element qui se trouve dans le tableai
        let index = this.products.indexOf(p)
        this.products.splice(index,1)
      }
    })
  }
}
