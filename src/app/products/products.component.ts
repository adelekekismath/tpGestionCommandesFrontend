import { Component } from '@angular/core';
import { ProductService, Product, ProductBaseDto } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule} from 'lucide-angular';
import { Category, CategoryService } from '../../services/category.service';
import { ToastService } from '../../services/toast.service';
import { AbstractCrudComponent } from '../components/abstract-crud';
import { GenericCrudView } from '../crud/generic-crud-view.component';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, GenericCrudView],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent extends AbstractCrudComponent<Product, ProductBaseDto> {
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
