import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() item: Recipe;
  @Input() index: number;
  // @Output('recipeSelected') itemSelected = new EventEmitter<void>();

  // constructor(private recipeService: RecipeService) {}

  ngOnInit() {

  }

  // onActiveItem() {
  //   this.itemSelected.emit();
  //   this.recipeService.recipeSelected.emit(this.item);
  // }

  // out() {
  //   console.log(this.item);
  // }
}
