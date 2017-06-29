import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef; 
  //@Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
                              .subscribe((index)=>{
                                this.editedItemIndex = index;
                                this.editMode = true;
                                this.editedItem = this.slService.getIngredient(index);
                                this.slForm.setValue({
                                  name: this.editedItem.name,
                                  amount: this.editedItem.amount
                                })
                              });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onSubmit(form: NgForm) {
    // this.ingredientAdded.emit({
    //   name: this.nameInputRef.nativeElement.value,
    //   amount: this.amountInputRef.nativeElement.value
    // })
    // let name = this.nameInputRef.nativeElement.value;
    // let amount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    let ingredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.slService.addIngredient(ingredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.onClear();
    this.slService.deleteIngredient(this.editedItemIndex);
  }

}
