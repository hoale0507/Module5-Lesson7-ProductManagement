import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product: Product = {};

  constructor(private productService: ProductService,
              private activedRoute: ActivatedRoute,
              private router: Router) {
    this.activedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = +paraMap.get('id');
      this.product = this.productService.getProductById(id);
    });
  }

  ngOnInit() {
  }

  submit() {
    this.productService.delete(this.product.id);
    this.router.navigateByUrl('/product/list');
  }
}
