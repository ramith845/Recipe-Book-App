import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('Salmon',
  'This is a salmon recipe.',
  'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg')
  ,new Recipe('Whasssup','Kobi Manchuri by mama','https://img.buzzfeed.com/video-api-prod/assets/eb44570519264864814264f7f0a5e47a/BFV13909_BakedRatatouille-ThumbTextless1080.jpg?resize=1200:*')
  ];
  @Output() recipeDetails = new EventEmitter<Recipe>();

  onRecipeSelected(recipe: Recipe) {
    this.recipeDetails.emit(recipe);
    console.log(recipe)
  }
}
