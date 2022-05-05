import {Injectable} from '@angular/core';
import {Category} from '../../model/category';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/product';

const API_URL = `${environment.apiURL}`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}/categories`);
  }

  getCategoryById(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/categories/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${API_URL}/categories`, category);
  }

  editCategory(id, category): Observable<Category> {
    return this.http.put<Category>(`${API_URL}/categories/${id}`, category);
  }
}
