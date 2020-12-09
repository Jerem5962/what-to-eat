import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MEALDB_ListItem, MEALDB_Meal, MEALDB_Category } from './model';
import { map } from 'rxjs/operators'

const API = {
  ROOT: "https://www.themealdb.com/api/json/v1/1/",
  get FILTER() {
    return this.ROOT + "filter.php?c="
  },
  get LOOKUP() {
    return this.ROOT + "lookup.php?i="
  },
  get CATEG() {
    return this.ROOT + "categories.php"
  }
}

@Injectable({
  providedIn: 'root'
})
export class MealdbApiService {

  constructor(private http: HttpClient) { }

  findByCategory(name: string): Observable<MEALDB_ListItem[]> {
    return this.http
      .get<MEALDB_ListItem[]>(API.FILTER + name)
      .pipe(
        map((res: any) => res.meals)
      )
  }

  findById(id: string): Observable<MEALDB_Meal> {
    return this.http
      .get<MEALDB_Meal>(API.LOOKUP + id)
      .pipe(
        map((res: any) => res.meals[0])
      )
  }

  findAllCategories(): Observable<MEALDB_Category[]> {
    return this.http
      .get<MEALDB_Category[]>(API.CATEG)
      .pipe(
        map((res: any) => res)
      )
  }
}
