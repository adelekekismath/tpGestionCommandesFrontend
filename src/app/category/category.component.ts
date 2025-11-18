import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories : Category[] = [];

  constructor(private categorieService: CategoryService){}

  ngOnInit(){
    this.loadCategories();
  }

  loadCategories(){
    this.categorieService.getAll().subscribe((data)=>{
      this.categories = data;
    })
  }
}
