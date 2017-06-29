import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(1, 'Tasty Schnitzel', 
                    'A super-tasty Schnitzel - just awesome', 
                    'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
                    [
                        new Ingredient('Meat', 1),
                        new Ingredient('French Fries', 20)
                    ]),
        new Recipe(2, 'Big Fat Burger', 
                    'Yummy Burger with Meat',
                    'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
                    [
                        new Ingredient('Buns', 2),
                        new Ingredient('Meat', 1)
                    ])
    ];

    getRecipes() {
        return this.recipes.slice();
    } 

    // getRecipeById(id) {
    //     const recipe = this.recipes.find((r)=>{
    //        return r.id===id;
    //     });
    //     return recipe;
    // }
    
    getRecipeById(index) {
        return this.recipes[index];
    }

    constructor(private slService: ShoppingListService){}

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(id: number, recipe: Recipe) {
        this.recipes[id] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}