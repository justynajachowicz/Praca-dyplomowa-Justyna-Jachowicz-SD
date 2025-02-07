import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shops: any[] = [];
  products: any[] = [];
  shoppingLists: any[] = [];
  purchases: any[] = [];

  shoppingListForm!: FormGroup;
  purchaseForm!: FormGroup;

  constructor(private shoppingService: ShoppingService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadInitialData();

    this.shoppingListForm = this.fb.group({
      listName: ['', Validators.required],
      shop: ['', Validators.required]
    });

    this.purchaseForm = this.fb.group({
      product: ['', Validators.required],
      price: ['', Validators.required],
      shopping: ['', Validators.required]
    });
  }

  loadInitialData(): void {
    this.shoppingService.getShops().subscribe(data => this.shops = data);
    this.shoppingService.getProducts().subscribe(data => this.products = data);
    this.shoppingService.getShoppingLists().subscribe(data => this.shoppingLists = data);
  }

  addShoppingList(): void {
    if (this.shoppingListForm.valid) {
      this.shoppingService.addShoppingList(this.shoppingListForm.value).subscribe(() => {
        this.loadInitialData();
        this.shoppingListForm.reset();
      });
    }
  }

  addPurchase(): void {
    if (this.purchaseForm.valid) {
      this.shoppingService.addPurchase(this.purchaseForm.value).subscribe(() => {
        this.loadInitialData();
        this.purchaseForm.reset();
      });
    }
  }

  deletePurchase(id: number): void {
    this.shoppingService.deletePurchase(id).subscribe(() => this.loadInitialData());
  }

  loadPurchases(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    
    if (target && target.value) {
      const value = target.value;
      console.log('Selected category:', value);
      // Logika ładowania zakupów na podstawie wartości
    } else {
      console.error('Invalid target or value is null');
    }
  }
}
