import { Component, OnInit } from '@angular/core';
import { Recipe } from "../recipe.model";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { RecipeService } from "../recipe.service";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent  implements OnInit {
  details: Recipe;
  id: number; // While Subscribing to id prams in 'ngOnInit' a local const id would have sufficed
  // but to show how prpgrammatically navigate complex URL(✅) on edit, id prop was created
  // @Input() details: Recipe;
  
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // const id = +this.route.snapshot.params['id'];
    // As the list is on left and new recipe can be selected changes to URl happen from same page i.e Use subscribe(Observables)
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.details = this.recipeService.getRecipeDetails(this.id);
      }  
    );
  }

  
  onAddToShoppingList() {
    this.recipeService.addIngToShoppingList(this.details.ingredients);
    // this.router.navigate(['/shopping-list']);
  }
  
  onEditRecipe() {
    this.router.navigate(['edit'],{relativeTo: this.route})
    // this.router.navigate(['../',this.id,'edit'],{relativeTo: this.route})✅ go up one level and contruct URL
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}
