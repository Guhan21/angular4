import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { MessageComponent } from './message/message.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

import { RecipeResolver } from './recipes/recipe-resolver.service';

const appRoutes: Routes = [
    {path:'', redirectTo: '/recipes', pathMatch:'full'},
    {path: 'recipes', component: RecipesComponent, children: [
        {path:'', component: MessageComponent, data:{message: 'Please select a recipe'}},
        {path:'new', component: RecipeEditComponent},
        {path:':id', component: RecipeDetailComponent},
        {path:':id/edit', component: RecipeEditComponent}
    ]},
    {path: 'shopping', component: ShoppingListComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}