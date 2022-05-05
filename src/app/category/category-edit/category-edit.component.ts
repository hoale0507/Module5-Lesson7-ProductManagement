import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryService} from '../../service/category/category.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  category: Category = {};
  categoryForm: FormGroup = new FormGroup(
    {
      name: new FormControl()
    }
  );

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getCategoryById(id);
    });
  }

  ngOnInit() {
  }

  getCategoryById(id) {
    this.categoryService.getCategoryById(id).subscribe(category => {
      this.category = category;
      this.categoryForm.get('name').setValue(category.name);
    });
  }

  submit(id: number, categoryForm: FormGroup) {
    this.categoryService.editCategory(id, categoryForm.value).subscribe(() => {
      this.notificationService.showMessage('success', 'Edit successfully');
      this.router.navigateByUrl('/categories');
    }, error => {
      this.notificationService.showMessage('error', 'Edited failed');
    });
  }
}
