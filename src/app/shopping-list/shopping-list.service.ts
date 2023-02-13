import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

import { Ingredient } from "../shared//ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  constructor() { }

  private ingredients: Ingredient[] = [
    new Ingredient('Carrot',5),
    new Ingredient('Tomato',3),
    new Ingredient('Apple',10)
  ];
  
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());

    // this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // ingredients.forEach((item) => this.ingredients.push(item))
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
    
    // this.ingredientsChanged.emit(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
