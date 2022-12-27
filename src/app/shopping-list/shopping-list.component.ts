import { Component } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('Carrot',5),
    new Ingredient('Tomato',3),
    new Ingredient('Apple',10)
  ];
  
  onIngredientAdded(ingredient: Ingredient) {
    console.log(ingredient)
    this.ingredients.push(ingredient);
  }

}
