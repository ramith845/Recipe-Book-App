import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() item: Recipe;
  // @Output('recipeSelected') itemSelected = new EventEmitter<void>();

  constructor(private recipeService: RecipeService) {}

  onActiveItem() {
    // this.itemSelected.emit();
    this.recipeService.recipeSelected.emit(this.item);
  }

  // out() {
  //   console.log(this.item);
  // }
}
