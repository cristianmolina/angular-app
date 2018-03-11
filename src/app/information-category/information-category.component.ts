import { Category } from '../categories/category';
import { CategoryService } from '../services/category.service';
import { Component, OnInit, Input } from '@angular/core';

/**
 * Componente donde se despliega la información de una categoria.
 */
@Component({
  selector: 'app-information-category',
  templateUrl: './information-category.component.html',
  styleUrls: ['./information-category.component.css']
})
export class InformationCategoryComponent implements OnInit {

  /**
   * Categoria seleccionada desde el Componente de la lista de categorias.
   */
  @Input() category: Category;

  constructor() { }

  ngOnInit() { }

}
