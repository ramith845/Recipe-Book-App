import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared//ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  constructor() {}

  private ingredients: Ingredient[] = [
    new Ingredient('Carrot', 5),
    new Ingredient('Tomato', 3),
    new Ingredient('Apple', 10),
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

  addIngredients(newIngredients: Ingredient[]) {
    // ingredients.forEach((item) => this.ingredients.push(item))
    const ingMap = new Map();
    this.ingredients.forEach((element, index) => {
      ingMap.set(element.name, { ...element, index });
    });
    // console.log(ingMap);

    newIngredients.forEach((newIng) => {
      if (ingMap.has(newIng.name)) {
        // console.log('Duplicate', newIng.amount);
        // console.log(newIng.name, ingMap[newIng.name]);

        const index = ingMap.get(newIng.name).index;
        this.ingredients[index].amount = newIng.amount;
      } else {
        this.ingredients.push(newIng);
      }
    });
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
