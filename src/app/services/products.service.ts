import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';

import { CreatedProductDTO, Product, UpdateProductDTO } from './../models/product.model';
import { environment } from 'src/environments/environment';
import { throwError, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API_URL: string = `${environment.API_URL}/api`;

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${this.API_URL}/products`)
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        };
      }))
    );
  }

  getProductsByPage(limit: number, offset:number) {
    return this.http.get<Product[]>(`${this.API_URL}/products`, {
      params: { limit, offset }
    });
  }

  readAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(
      this.getProduct(id),
      this.updateProduct(id, {title: 'holas'})
    )
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.API_URL}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.NoContent) {
          return throwError('aiuda')
        }
        return throwError('Ups')
      })
    );
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
