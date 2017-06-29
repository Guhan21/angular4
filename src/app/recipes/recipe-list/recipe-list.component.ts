import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // @Output() wasRecipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription: Subscription;
  // recipes: Recipe[] = [
  //   new Recipe('A test recipe', 'Simply a recipe to check', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxQZ5PrFE8kU_5ZR1GIKOM3K9dIYuWO3HniM_jKqDvVxmR03DX'),
  //   new Recipe('A test recipe 2', 'Simply a second recipe to check', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxQZ5PrFE8kU_5ZR1GIKOM3K9dIYuWO3HniM_jKqDvVxmR03DX')
  // ] 

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[])=>{
      this.recipes = recipes;
    })
    this.recipes = this.recipeService.getRecipes();
  }
  // onRecipeSelected(recipe: Recipe) {
  //   this.wasRecipeSelected.emit(recipe);
  // }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
