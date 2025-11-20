import { Component } from '@angular/core';
import { CategorieDto, CategoryService } from '../../services/category.service';
import { Category } from '../../services/category.service';
import { GenericTableComponent } from '../components/generic-table/generic-table.component';
import { LucideAngularModule } from 'lucide-angular';
import { ToastService } from '../../services/toast.service';
import { FormsModule } from '@angular/forms';
import { CrudComponent } from '../components/crud.component';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [GenericTableComponent, LucideAngularModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})


export class CategoryComponent extends CrudComponent<Category, CategorieDto> {

  createEmptyForm(): CategorieDto {
      return {
        nom: '',
        description: ''
      };
  }
  constructor(private categoryService: CategoryService,
      toastService: ToastService,) {
        super(categoryService, toastService)
      }
}
