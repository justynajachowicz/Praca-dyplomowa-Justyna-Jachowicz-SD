import { Component } from '@angular/core';
import { PurchaseItem } from 'src/app/models/purchase-item';
import { ShoppingService } from 'src/app/services/shopping.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./shopping-form.component.css']
})
export class ShoppingFormComponent {
  purchaseItem: PurchaseItem = {
    productName: '',
    price: 0,
    store: '',
    purchaseDate: ''
  };

  constructor(private shoppingService: ShoppingService) {}

  submitForm() {
    this.shoppingService.addPurchase(this.purchaseItem).subscribe({
      next: (response: any) => {
        console.log('Zakup zapisany:', response);
        alert('Zakup dodany!');
        this.resetForm();
      },
      error: (error: any) => {
        console.error('Błąd podczas zapisywania:', error);
      }
    });
  }

  resetForm() {
    this.purchaseItem = { productName: '', price: 0, store: '', purchaseDate: '' };
  }
}