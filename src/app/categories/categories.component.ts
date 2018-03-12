import {Component, OnInit} from '@angular/core';
import {CATEGORIES_MOCK} from '../categories/categories-mock';
import {Category} from './category';
import {CategoryService} from '../services/category.service';
import {RedditsData} from './reddits-data';
import {Subject} from 'rxjs';

/**
 * Componente que muestra la lista de categorias.
 */
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  providers: [CategoryService],
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

  /**
   * Permite ejecutar busqueda al escribir.
   */
  searchTerm$ = new Subject<string>();

  /*
   * Constructor por defecto.
   * @param categoryService servicio.
   */
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
  }

  onSelect(category: Category): void {
    this.selectedCategory = category;

    // Obtiene los comentarios de la categoria seleccionada.
    this.categoryService.getComments(category.url)
      .subscribe(data => this.initComments(data));
  }

  /**
   * Consulta las categorias del servidor por medio del servicio.
   */
  getCategories(): void {
    this.categoryService.getCategories(this.searchTerm$)
      .subscribe(data => this.initCategories(data));
    // Se ejecuta la primera busqueda sin filtros.
    this.searchTerm$.next('');
  }

  /*
   * inicializa las categorias, mapeando los datos del json del servidor.
   */
  initCategories(redditsData: RedditsData): void {
    this.categories = [];
    const registros = redditsData.data['children'];
    registros.forEach(registro => {
      if (registro.data.title.toUpperCase().indexOf(redditsData.term.toUpperCase()) >= 0) {
        this.categories.push(registro.data);
      }
    });
  }

  /**
  * inicializa los comentarios, mapeando los datos del json del servidor.
  */
  initComments(redditsData: RedditsData): void {
    const comments = [];
    const registros = redditsData.data['children'];
    registros.forEach(registro => {
      comments.push(registro.data);
    });

    this.selectedCategory.comments = comments;
  }

}
