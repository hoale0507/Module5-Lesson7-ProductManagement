import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = {};
  productForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
  });

  constructor(private productService: ProductService,
              private activedRoute: ActivatedRoute,
              private router: Router) {
    this.activedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getProductById(id);
    });
  }

  ngOnInit() {
    this.productForm.get('id').setValue(this.product.id);
    this.productForm.get('name').setValue(this.product.name);
    this.productForm.get('price').setValue(this.product.price);
    this.productForm.get('description').setValue(this.product.description);
  }

  submit() {
    this.productService.update(this.product.id, this.productForm.value);
    this.router.navigateByUrl('/product/list');
  }

  getProductById(id) {
    this.product = this.productService.getProductById(id);
  }
}
