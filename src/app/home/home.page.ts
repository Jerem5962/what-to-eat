import { Component, OnInit } from '@angular/core';
import { MealdbApiService } from '../mealdb-api.service';
import { MEALDB_ListItem, MEALDB_Category } from '../model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  meals: MEALDB_ListItem[] | null = null;
  categories: MEALDB_Category[] | null = null;
  selectCategory: string = "";

  constructor(private mealdb: MealdbApiService ) {
    this.mealdb.findByCategory(this.categoryIsDefined())
      .subscribe(meals => this.meals = meals);
  }

  ngOnInit() {
    this.getCategories();
  }

  onChange(e) {
    this.selectCategory = e.target.value;
    this.mealdb.findByCategory(this.selectCategory)
      .subscribe(meals => this.meals = meals);
  }

  getCategories() {
    return this.mealdb.findAllCategories().subscribe(categories => this.categories = categories.categories)
  }

  categoryIsDefined() {
    return this.categories ? this.categories : this.selectCategory = "lamb";
  }



}
