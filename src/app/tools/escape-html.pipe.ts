import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Pipe para obtener el html que se encuentra codificado en el JSON.
 */
@Pipe({
  name: 'escapeHtml',
  pure: false
})
export class EscapeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(html: string): SafeHtml {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

}
