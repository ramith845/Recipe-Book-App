import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  // @Output() recipeDetails = new EventEmitter<Recipe>();
  
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private authSevice: AuthService,
    private dsService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();

    if (!this.authSevice.hasFetchRecipesCalled()) {
      this.dsService.fetchRecipes().pipe(take(1))
      .subscribe(() => {
        console.log('Waaaaahhhhhh!!!!');
        this.authSevice.setFetchRecipesCalled();
      })
    }
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeDetails.emit(recipe);
  //   console.log(recipe);
  // }

  onNewRecipe() {
    this.router.navigate(['new'],{relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();      
  }
}
