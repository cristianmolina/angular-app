import {Category} from '../categories/category';
import {RedditsData} from '../categories/reddits-data';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

/**
 * Servicio para consultar las categorias del servidor.
 */
@Injectable()
export class CategoryService {

  urlBase = 'https://www.reddit.com';
  urlCategories = 'https://www.reddit.com/reddits.json';
  queryUrl = '?search=';

  constructor(private http: HttpClient) {}

  getCategories(terms: Observable<string>): Observable<RedditsData> {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
    // return this.http.get<RedditsData>(this.urlCategories);
  }

  getComments(urlpost): Observable<RedditsData> {
    return this.http.get<RedditsData>(this.urlBase + urlpost + '.json');
  }

  searchEntries(term): Observable<RedditsData> {
    return this.http
      .get<RedditsData>(this.urlCategories + this.queryUrl + term)
      .pipe(
      map(res => {
        res.term = term;
        return res;
      })
      );
  }
}
