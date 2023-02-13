import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Salmon',
  //     'This is a salmon recipe.',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Norwegia_Roll_Salmon_Sushi.jpg/1280px-Norwegia_Roll_Salmon_Sushi.jpg',
  //     [new Ingredient('Meat', 4), new Ingredient('Cardammom', 3)]
  //   ),
  //   new Recipe(
  //     'Whasssup',
  //     'Kobi Manchuri by mama',
  //     'https://img.buzzfeed.com/video-api-prod/assets/eb44570519264864814264f7f0a5e47a/BFV13909_BakedRatatouille-ThumbTextless1080.jpg?resize=1200:*',
  //     [new Ingredient('Cheese', 2), new Ingredient('Onion', 5)]
  //   ),
  // ];
  recipeChanged = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeDetails(index: number) {
    return this.recipes[index];
  }

  addIngToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
