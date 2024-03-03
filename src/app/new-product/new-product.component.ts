import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent  implements OnInit{
  productFormGroup! : FormGroup
  constructor(private fb : FormBuilder, private prodService : ProductService, private router : Router) {
  }
  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      price : this.fb.control(0, [Validators.required]),
      promotion : this.fb.control(false, [Validators.required])
    })
  }

  handleAddProduct() {
     let product = this.productFormGroup.value
      this.prodService.addNewProduct(product).subscribe({
        next : (data) => {
          alert("produit bien ajouté")
         // this.router.navigateByUrl("/admin/product")
          this.productFormGroup.reset()

        }
      })
  }

  //Fonction de message d'erreur
  getErrorMessage(fiedldName: string, error: ValidationErrors) {
    if (error['required']){
      return fiedldName + "is Required"
    }else if (error['minlength']){
      return fiedldName+ " should have at leat " + error['minlength']['requiredLength']+" Characters"
    }else return ""
  }
}
