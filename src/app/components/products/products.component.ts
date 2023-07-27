import { Component, OnInit } from '@angular/core';

import { CreatedProductDTO, Product, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChossen: Product | undefined = undefined;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowProductDetail(id: string) {
    this.productsService.getProduct(id)
    .subscribe((product) => {
      this.productChossen = product;
      this.toggleProductDetail();
    })
  }

  createNewProduct() {
    const product: CreatedProductDTO = {
      title: 'Nuevo Producto',
      description: 'keke',
      images: ['https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200'],
      price: 200,
      categoryId: 2
    };
    this.productsService.createProduct(product)
    .subscribe((product) => {
      console.log(product);
    });
  }

  updateProduct() {
    const product: UpdateProductDTO = {
       title: 'titulo'
    };

    const id = this.productChossen?.id;
    if (typeof id !== 'undefined') {
      this.productsService.updateProduct(id, product)
      .subscribe(data => {

      });
    }
  }

   deleteProduct() {
    const id = this.productChossen?.id;
    if (typeof id !== 'undefined') {
      this.productsService.deleteProduct(id)
      .subscribe(() => {

      });;
    }
   }
}
