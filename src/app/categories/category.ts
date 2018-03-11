import { Type } from '@angular/core';
/**
 * Clase con las propiedades a utilizar de una categoria.
 */
export class Category {
  id: string;
  title: string;
  description_html: Type<any>;
  header_img: string;
  banner_img: string;
  public_description_html: string;
  submit_text_html: string;
  public_description: string;

  constructor() {}
}