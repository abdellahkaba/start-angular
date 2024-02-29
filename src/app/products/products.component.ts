import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products! : Array<Product>
  errorMessage! : string
  searchFormGroup! : FormGroup

  //on aura besoin d'utiliser notre service en l'injectant dans le constructeur
  constructor(private productService : ProductService, private fb : FormBuilder) {
  }
  //on l'utilise dans ngOnInit en retourant un objet de type observable
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control(null)
    })
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


  handleDeleteProduct(p: Product) {
    let conf = confirm("Vous etes sur de supprimer ? ");
    if (conf == false) return;
    this.productService.deleteProduct(p.id).subscribe({
      next : (data) => {
         // this.handleGetAllProducts()
        //on supprime l'element qui se trouve dans le tableai
        let index = this.products.indexOf(p)
        this.products.splice(index,1)
      }
    })
  }

  handleSetPromotion(p: Product) {
    let promo = p.promotion
    this.productService.setPromotion(p.id).subscribe({
      next : (data) => {
        p.promotion=!promo
      },
    })
  }

  handleSearchProduct() {
    let keyword = this.searchFormGroup.value.keyword
    this.productService.searchProducts(keyword).subscribe( {
      next : (data) => {
        this.products = data
      }
    })
  }
}
