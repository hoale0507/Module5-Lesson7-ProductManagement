import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {CategoryService} from '../../service/category/category.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  products: Product[] = [];

  constructor(private categoryService: CategoryService,
              private activedRoute: ActivatedRoute) {
    this.activedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = + paramMap.get('id');
      this.getProductsByCategory(id);
    });
  }

  ngOnInit() {
  }

  getProductsByCategory(id) {
    this.categoryService.getCategoryById(id).subscribe(productlist => {
      this.products = productlist;
    });
  }

}
