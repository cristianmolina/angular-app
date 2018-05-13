import {Component, OnInit} from '@angular/core';
import {CATEGORIES_MOCK} from '../categories/categories-mock';
import {Category} from './category';
import {CategoryService} from '../services/category.service';
import {RedditsData} from './reddits-data';
import {Subject} from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
/**
 * Componente que muestra la lista de categorias.
 */
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  providers: [CategoryService],
  styleUrls: ['./categories.component.css'],
  animations: [
    trigger('stateMenu', [
      state('inactive', style({
        transform: 'translateX(0)'
      })),
      state('active',   style({
        transform: 'translateX(-100%)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
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

  stateMenu = 'inactive';
  showLoader = true;

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

    this.toggleState();
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
      if (!registro.data.icon_img) {
        registro.data.icon_img = 'https://www.redditstatic.com/mweb2x/img/snoo-128.png';
      }

      if (registro.data.title.toUpperCase().indexOf(redditsData.term.toUpperCase()) >= 0) {
        this.categories.push(registro.data);
      }
    });
    this.showLoader = false;
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

  toggleState() {
    this.stateMenu = this.stateMenu === 'active' ? 'inactive' : 'active';
  }

}
