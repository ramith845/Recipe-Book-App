import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from "../store/app.reducer";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  ingChngSub: Subscription;

  selectedItem = null;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    // Overhaulin: here data is managed here is using ngrx state management👌💕
    // Observable is returned
    this.ingredients = this.store.select('shoppingList');

    // Old way of managing data using services 👎
    // this.ingredients = this.slService.getIngredients();
    // this.ingChngSub = this.slService.ingredientsChanged.subscribe(
    //   (list: Ingredient[]) => (this.ingredients = list)
    // );
  }

  onEditItem(index: number) {
    // this.selectedItem = index;
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
  // onIngredientAdded(ingredient: Ingredient) {
  //   console.log(ingredient)
  //   this.ingredients.push(ingredient);
  // }

  ngOnDestroy(): void {
    // this.ingChngSub.unsubscribe();
  }
}
