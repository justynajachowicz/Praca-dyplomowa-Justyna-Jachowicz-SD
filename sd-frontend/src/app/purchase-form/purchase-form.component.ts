import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseItem } from '../models/purchase-item';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./purchase-form.component.css']
})
export class PurchaseFormComponent {
  purchaseItem: PurchaseItem = {
    productName: '',
    price: 0,
    store: '',
    purchaseDate: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.purchaseItem.productName || this.purchaseItem.price <= 0 || !this.purchaseItem.store || !this.purchaseItem.purchaseDate) {
      alert("Proszę wypełnić wszystkie pola poprawnie.");
      return;
    }

    console.log("Dodano zakup:", this.purchaseItem);
    alert("Zakup został dodany!");

    // Możesz tu dodać logikę wysyłania danych do backendu
    // this.purchaseService.addPurchase(this.purchaseItem).subscribe(...);

    // Po dodaniu zakupu można zresetować formularz:
    this.purchaseItem = {
      productName: '',
      price: 0,
      store: '',
      purchaseDate: ''
    };
  }
  goBack() {
    this.router.navigate(['/']);
  }
}