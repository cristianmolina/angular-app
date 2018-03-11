import { Component, OnInit } from '@angular/core';
import {CATEGORIES_MOCK} from '../categories/categories-mock';
import { Category } from './category';
import { CategoryService } from '../services/category.service';
import { RedditsData } from './reddits-data';

/**
 * Componente que muestra la lista de categorias.
 */
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  providers: [ CategoryService ],
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  /**
   * Categoria actual en la selección.
   */
  selectedCategory: Category;

  /**
   * Lista de categorias a mostrar.
   */
  categories: Category[];

  /*
   * Constructor por defecto.
   * @param categoryService servicio.
   */
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  onSelect(category: Category): void {
    this.selectedCategory = category;
  }

  /**
   * Consulta las categorias del servidor por medio del servicio.
   */
  getCategories(): void {
    this.categoryService.getCategories()
        .subscribe(data => this.initCategories(data));
  }
  
  /*
   * inicializa las categorias, mapeando los datos del json del servidor.
   */
  initCategories(redditsData: RedditsData): void {
    this.categories = [];
    const registros = redditsData.data['children'];
    registros.forEach(registro => {
      this.categories.push(registro.data);
    });
  }

}
