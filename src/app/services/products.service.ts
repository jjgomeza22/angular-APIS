import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

import { CreatedProductDTO, Product, UpdateProductDTO } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API_URL: string = 'https://young-sands-07814.herokuapp.com/api';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${this.API_URL}/products`)
    .pipe(
      retry(3)
    );
  }

  getProductsByPage(limit: number, offset:number) {
    return this.http.get<Product[]>(`${this.API_URL}/products`, {
      params: { limit, offset }
    });
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.API_URL}/products/${id}`);
  }

  createProduct(newProduct: CreatedProductDTO) {
    return this.http.post<Product>(`${this.API_URL}/products`, newProduct);
  }

  updateProduct(id: string, product: UpdateProductDTO) {
    return this.http.put<Product>(`${this.API_URL}/products/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete<boolean>(`${this.API_URL}/products/${id}`);
  }
}
