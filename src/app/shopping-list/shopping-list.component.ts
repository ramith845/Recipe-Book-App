import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingChngSub: Subscription;

  selectedItem = null;
  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.ingChngSub = this.slService.ingredientsChanged.subscribe(
      (list: Ingredient[]) => (this.ingredients = list)
    );
  }

  onEditItem(index: number) {
    // this.selectedItem = index;
    this.slService.startedEditing.next(index);
  }
  // onIngredientAdded(ingredient: Ingredient) {
  //   console.log(ingredient)
  //   this.ingredients.push(ingredient);
  // }

  ngOnDestroy(): void {
    this.ingChngSub.unsubscribe();
  }
}
