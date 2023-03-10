import { Action } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';

import { ADD_INGREDIENT } from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Carrot', 5),
    new Ingredient('Tomato', 3),
    new Ingredient('Apple', 10),
  ],
};

export function shoppingListReducer(state = initialState, action: Action) {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return {
                ...state, // here its pretty useless to dump all property cos only one property is present, use with multiple prop
                ingredients: [...state.ingredients, action]
            }
    }
}
