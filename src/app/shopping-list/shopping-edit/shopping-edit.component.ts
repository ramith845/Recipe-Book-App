import { Component, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";

import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  // @Output('ingredient') ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private slService: ShoppingListService) {}

  onAddIngredient() {
    const ingName: string = this.nameInputRef.nativeElement.value;
    const ingAmount: number = this.amountInputRef.nativeElement.value;
    const newIng = new Ingredient(ingName, ingAmount);
    // this.ingredientAdded.emit(newIng);
    this.slService.addIngredient(newIng);
  }
}
