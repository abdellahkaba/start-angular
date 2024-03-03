import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<Product> ;
  constructor() {
    this.products = [
      {id: UUID.UUID(), name : "Computer", price : 2000,promotion : false},
      {id: UUID.UUID(), name : "Iphone", price : 3000, promotion : true},
      {id: UUID.UUID(), name : "Tablette", price : 2500, promotion : true},
    ];

    for(let i = 0; i<10; i++){
      this.products.push({id: UUID.UUID(), name : "Computer", price : 2000,promotion : false})
      this.products.push({id: UUID.UUID(), name : "Iphone", price : 3000, promotion : true})
      this.products.push({id: UUID.UUID(), name : "Tablette", price : 2500, promotion : true})
    }
  }

  //Une methode qui permet de retourner les produits
  //en utilisant la technique observable
  public getAllProducts() : Observable<Array<Product>>{
    //on genere la probalite des erreurs
    let rnd = Math.random();
    if (rnd<0.2) return  throwError(() => Error("Pas d'internet"))
   else return of([...this.products]) ;
  }

  //une methode de pagination

  public getPageProducts(page : number, size : number) : Observable<{ size: number; totalPage: number; page: number; products: Product[] }>{
    let index = page * size
    let totalPages = ~~(this.products.length/size)
    if(this.products.length % size != 0){
      totalPages++
    }

    let pageProducts = this.products.slice(index,index+size)
    return of({page:page, size:size, totalPage: totalPages, products : pageProducts})


  }

  //une methode de suppression

  public deleteProduct(id : string) : Observable<boolean>{
    //je veux parcourir le tableau pour chaq p je garde id qui est different de id
    //autrment dit remplacer un tableau par un autre
   this.products = this.products.filter(p => p.id!=id)
   return of(true)
  }

  //une methode qui change les promotions
  public setPromotion(id : string) : Observable<boolean> {
    //on cherche le produit
    let product = this.products.find(p=>p.id==id);
    if (product != undefined){
      product.promotion=!product.promotion
      return of(true)
    } else return throwError(() => new Error("Product not found"))
  }

  //une methode de recherche
  public searchProducts (keyword : string,page : number, size : number) : Observable<{ size: number; totalPage: number; page: number; products: Product[] }>{
   let result = this.products.filter(p=>p.name.includes(keyword))
    let index = page * size
    let totalPages = ~~(result.length/size)
    if(this.products.length % size != 0){
      totalPages++
    }

    let pageProducts = result.slice(index,index+size)
    return of({page:page, size:size, totalPage: totalPages, products : pageProducts})

  }

  //une methode qui ajoute un produit
  public addNewProduct(product : Product) : Observable<Product>{
    product.id=UUID.UUID()
    this.products.push(product)
    return of(product)
  }

  public getProduct(id : string) : Observable<Product> {
   let product = this.products.find(p => p.id == id)
      if (product == undefined) return throwError(() => Error("Product not found"))
      return of(product)
  }

    //Fonction de message d'erreur
    getErrorMessage(fiedldName: string, error: ValidationErrors) {
        if (error['required']){
            return fiedldName + "is Required"
        }else if (error['minlength']){
            return fiedldName+ " should have at leat " + error['minlength']['requiredLength']+" Characters"
        }else return ""
    }
    //Une fonction qui met le produit a jour
    public updateProduct (product : Product) : Observable<Product> {
    this.products = this.products.map(p => (p.id == product.id)?product:p)
        return of(product)
    }
}
