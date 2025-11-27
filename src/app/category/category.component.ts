import { Component } from '@angular/core';
import { CategorieDto, CategoryService } from '../../services/category.service';
import { Category } from '../../services/category.service';
import { LucideAngularModule } from 'lucide-angular';
import { ToastService } from '../../services/toast.service';
import { FormsModule } from '@angular/forms';
import { AbstractCrudComponent } from '../components/abstract-crud';
import { GenericCrudView } from '../components/generic-crud-view/generic-crud-view.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, GenericCrudView],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})


export class CategoryComponent extends AbstractCrudComponent<Category, CategorieDto, CategorieDto> {

  searchTerm: string = '';
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

  filteredCategories(): Category[] {
    if (!this.items) {
      return [];
    }

    const lowerSearchTerm = this.searchTerm.toLowerCase().trim();

    if (!lowerSearchTerm) {
      return this.items;
    }

    return this.items.filter(category =>
      category.nom.toLowerCase().includes(lowerSearchTerm) ||
      category.description.toLowerCase().includes(lowerSearchTerm)
    );
  }
}
