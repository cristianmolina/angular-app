import {Category} from '../categories/category';
import { RedditsData } from '../categories/reddits-data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

/**
 * Servicio para consultar las categorias del servidor.
 */
@Injectable()
export class CategoryService {

  urlCategories = 'https://www.reddit.com/reddits.json';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<RedditsData> {
    return this.http.get<RedditsData>(this.urlCategories);
  }

}
