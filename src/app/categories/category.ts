import { Type } from '@angular/core';

import { Comment } from '../comments/comment';
/**
 * Clase con las propiedades a utilizar de una categoria.
 */
export class Category {
  id: string;
  title: string;
  description_html: Type<any>;
  header_img: string;
  banner_img: string;
  icon_img: string;
  display_name_prefixed: string;
  public_description_html: string;
  submit_text_html: string;
  public_description: string;
  url: string;
  comments: Comment[];

  constructor() {}
}
