import { Component, ViewChild } from '@angular/core';
import { ProductService, Product, ProductBaseDto } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, PenIcon, TrashIcon } from 'lucide-angular';
import { Category, CategoryService } from '../../services/category.service';
import { ToastComponent } from '../toast/toast.component';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, ToastComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = [];
  categories : Category[] = [];
  editing: boolean = false;
  editProductId: number | null = null;
  form: ProductBaseDto = {
    nom: null,
    description: null,
    prix: null,
    stock: null,
    categorieId: null,
  };
  readonly PenIcon = PenIcon;
  readonly TrashIcon = TrashIcon;
  @ViewChild(ToastComponent) toast! : ToastComponent;

  constructor(private productService: ProductService,
    private toastService: ToastService,
    private categorieService: CategoryService) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }


  loadCategories(){
    this.categorieService.getAll().subscribe((data)=>{
      this.categories = data;
    })
  }

  loadProducts(){
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  saveProduct(){
    if(this.editing && this.editProductId){
      this.productService.put(this.editProductId,this.form).subscribe({
        next:()=>{
          this.toastService.showSuccess(`Le produit ${this.form.nom} a bien été modifié`)
          this.resetForm();
          this.loadProducts();
        },
        error:(err)=>{
          let errorsMessages = '';
          Object.values(err.error.errors).forEach((element: any) => {
             errorsMessages += `<p>${element}</p>`;
          });
          this.toastService.showError(errorsMessages)
        }
      })
    }
    else{
      this.productService.create(this.form).subscribe({
        next:(data)=>{
          this.toastService.showSuccess("Le produit a bien été ajouté");
          this.resetForm();
          this.loadProducts();
        },
        error:(err)=>{
          this.toastService.showError("Une ereur est survenue", err)
        }
      })
    }

  }

  editProduct(productToUpdate:Product){
    this.editProductId = productToUpdate.id;
    this.form.categorieId = productToUpdate.categorieId;
    this.form.description = productToUpdate.description;
    this.form.nom = productToUpdate.nom;
    this.form.prix = productToUpdate.prix;
    this.form.stock = productToUpdate.stock;
    this.editing = true;
  }

  cancelEdit(){
    this.resetForm();
  }

  resetForm(){
    this.form.nom = '';
    this.form.description = '';
    this.form.prix = 0;
    this.form.stock = 0;
    this.form.categorieId = 0;
    this.editing = false;
    this.editProductId = null;
  }

  deleteProduct(id:number){
    this.productService.delete(id).subscribe({
      next:()=>{
        this.toastService.showSuccess(`Le produit a bien été supprimé`);
        this.loadProducts();
      }
    })
  }
}
