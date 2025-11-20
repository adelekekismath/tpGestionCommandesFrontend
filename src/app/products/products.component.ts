import { Component } from '@angular/core';
import { ProductService, Product, ProductBaseDto } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule} from 'lucide-angular';
import { Category, CategoryService } from '../../services/category.service';
import { ToastService } from '../../services/toast.service';
import { GenericTableComponent } from '../components/generic-table/generic-table.component';
import { CrudComponent } from '../components/crud.component';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, GenericTableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent extends CrudComponent<Product, ProductBaseDto> {
  categories: Category[] = [];

  constructor(private productService: ProductService,
    toastService: ToastService,
    private categoryService: CategoryService) {
      super(productService, toastService)
    }

  createEmptyForm(): ProductBaseDto {
    return {
      nom: '',
      description: '',
      prix: 0,
      stock: 0,
      categorieId: 0
    };
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadCategories();
  }


  loadCategories(){
    this.categoryService.getAll().subscribe((data)=>{
      this.categories = data;
    })
  }

}
