import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryService} from '../../service/category/category.service';
import {NotificationService} from '../../service/notification/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  categoryForm: FormGroup = new FormGroup(
    {
      name: new FormControl()
    }
  );

  constructor(private categoryService: CategoryService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  create(productForm) {
    this.categoryService.createCategory(productForm.value).subscribe(() => {
      this.notificationService.showMessage('success', 'Created successfull!');
      this.router.navigateByUrl('/categories');
    }, error => {
    });
    this.notificationService.showMessage('error', 'Created failed!');
  }
}
