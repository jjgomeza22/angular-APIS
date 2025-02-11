import { Component, OnInit } from '@angular/core';

import { CreatedProductDTO, Product, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { switchMap } from 'rxjs/operators'
import { zip } from 'rxjs'

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
  statusDetail: 'loading' | 'success' | ' error' | 'init' = 'init';

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
    this.statusDetail = 'loading';
    this.productsService.getProduct(id)
    .subscribe((product) => {
      this.statusDetail = 'success';
      this.productChossen = product;
      this.toggleProductDetail();
    }, error => {
      this.statusDetail = ' error';
      console.error(error);
    });
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

   //Callback hell
  readAndUpdateProduc(id: string) {
    this.productsService.getProduct(id)
    .subscribe(product => {
      this.productsService.updateProduct(product.id, {title: 'holas'})
      .subscribe(data => {
        console.log(data);
      })
    });
  }

  //avoid callback hell
  readAndUpdateProducWithOutCallBackHell(id: string) {
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product) =>  this.productsService.updateProduct(product.id, {title: ''})),
      switchMap((product) =>  this.productsService.updateProduct(product.id, {title: ''})),
      switchMap((product) =>  this.productsService.updateProduct(product.id, {title: ''}))
    )
    .subscribe(data => {
      console.log(data);
    });

    zip(
      this.productsService.getProduct(id),
      this.productsService.updateProduct(id, {title: 'holas'})
    )
    .subscribe(response => {
      const product = response[0];
      const update = response[1];
    });

    this.productsService.readAndUpdate(id, {title: 'holas'})
    .subscribe(response => {
      const product = response[0];
      const update = response[1];
    });
  }
}
