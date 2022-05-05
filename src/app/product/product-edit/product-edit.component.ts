import {Component, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {error} from 'protractor';
import {NotificationService} from '../../service/notification/notification.service';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category/category.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  categories: Category[] = [];
  product: Product = {};
  productForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    image: new FormControl(),
    category: new FormControl()
  });

  constructor(private productService: ProductService,
              private activedRoute: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService,
              private categoryService: CategoryService) {
    this.activedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getProductById(id);
    });
  }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(categoryList => {
      this.categories = categoryList;
    });
  }

  submit() {
    const product = new FormData();
    const productValue = this.productForm.value;
    product.append('name', productValue.name);
    product.append('price', productValue.price);
    product.append('description', productValue.description);
    productValue.category = +productValue.category;
    product.append('category', productValue.category);
    const element = <HTMLInputElement> document.getElementById('image');
    if (element.files.length !== 0) {
      const image = element.files[0];
      product.append('image', image);
    }
    this.productService.update(this.product.id, product).subscribe(() => {
      this.router.navigateByUrl('/product/list');
      this.notificationService.showMessage('success', 'Edited successfully!');
      // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      this.notificationService.showMessage('error', 'Updated failed!');
    });
  }

  getProductById(id) {
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
      this.productForm.get('id').setValue(this.product.id);
      this.productForm.get('name').setValue(this.product.name);
      this.productForm.get('price').setValue(this.product.price);
      this.productForm.get('description').setValue(this.product.description);
      this.productForm.get('category').setValue(this.product.category.id);
    }, er => {
      console.log(er);
    });
  }
}
