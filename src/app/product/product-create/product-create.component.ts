import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product/product.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category/category.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  categories: Category[] = [];
  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    image: new FormControl(),
    category: new FormControl()
  });

  constructor(private productService: ProductService,
              private router: Router,
              private notificationService: NotificationService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  create(productForm) {
    const value = productForm.value;
    value.category = + value.category;
    const product = new FormData();
    product.append('name', value.name);
    product.append('description', value.description);
    product.append('price', value.price);
    product.append('category', value.category);
    const image = (<HTMLInputElement> document.getElementById('image')).files[0];
    product.append('image', image);
    const observable = this.productService.createProduct(product);
    observable.subscribe(() => {
      this.notificationService.showMessage('success', 'Created successfully!');
      this.router.navigateByUrl('/product/list');
      this.productForm.reset();
    }, error => {
      this.notificationService.showMessage('error', 'Created failed!');
    });
  }

}
