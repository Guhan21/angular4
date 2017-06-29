import { Component, OnInit, Input } from '@angular/core';

import { RecipeService } from './recipe.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  //providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //this.selectedRecipe=this.recipeService.getRecipeById(1);
    // this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipe)=>{
    //     this.selectedRecipe = recipe;
    //   }
    // )
  }

}
