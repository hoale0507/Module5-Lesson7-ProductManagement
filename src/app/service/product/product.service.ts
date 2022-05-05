import {Injectable} from '@angular/core';
import {Product} from '../../model/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const API_URL = `${environment.apiURL}`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/products`);
  }

  createProduct(product): Observable<Product> {
    return this.http.post<Product>(`${API_URL}/products/upload`, product);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }

  update(id, product): Observable<Product> {
    return this.http.post(`${API_URL}/products/upload/${id}`, product);
  }

  delete(id): Observable<Product> {
    return this.http.delete(`${API_URL}/products/${id}`);
  }
}
