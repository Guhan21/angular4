import { Subscription } from 'rxjs/Subscription';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientsSubscription: Subscription;
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.ingredientsSubscription = this.slService.ingredientsChanged.subscribe((ingredient: Ingredient[])=>{
      this.ingredients = ingredient;
    })
  }
  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
  // }
  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.ingredientsSubscription.unsubscribe();
  }
}
