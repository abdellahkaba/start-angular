import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<Product> ;
  constructor() {
    this.products = [
      {id: 1, name : "Computer", price : 2000},
      {id: 2, name : "Iphone", price : 3000},
      {id: 3, name : "Tablette", price : 2500},
    ];
  }

  //Une methode qui permet de retourner les produits
  //en utilisant la technique observable
  public getAllProducts() : Observable<Array<Product>>{
    //on genere la probalite des erreurs
    let rnd = Math.random();
    if (rnd<0.2) return  throwError(() => Error("Pas d'internet"))
   else return of(this.products) ;
  }

  //une methode de suppression

  public deleteProduct(id : number) : Observable<boolean>{
    //je veux parcourir le tableau pour chaq p je garde id qui est different de id
    //autrment dit remplacer un tableau par un autre
   this.products = this.products.filter(p => p.id!=id)
    return of(true)
  }
}
