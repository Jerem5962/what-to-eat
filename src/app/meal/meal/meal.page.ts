import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MEALDB_Meal } from 'src/app/model';
import { MealdbApiService } from '../../mealdb-api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {

  meal: MEALDB_Meal | null = null;
  tags: string[] = [];
  ingredients: string[] = [];
  measures: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private mealdb: MealdbApiService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    let mealId: string = this.route.snapshot.paramMap.get("id");
    this.mealdb.findById(mealId)
      .subscribe(meal => {
        this.meal = meal;
        this.tags = meal.strTags.split(',');
        this.ingredients = this.getIngredients(meal);
      }
      )  
  }

  getYoutubeUrl(meal: MEALDB_Meal) {
    let ytLink = meal.strYoutube.replace("watch?v=", "embed/");
    return this.sanitizer.bypassSecurityTrustResourceUrl(ytLink);
  }

  private getIngredients(meal: MEALDB_Meal): string[] {
    let ingredients: string[] = [];
    for (let i=1; i<=20; i++) {
      let ingredient = meal["strIngredient" + i];
      let measure = meal["strMeasure" + i];
      if (ingredient){
        ingredients.push([ingredient, measure])
      } 
    }
    return ingredients;
  }
}
