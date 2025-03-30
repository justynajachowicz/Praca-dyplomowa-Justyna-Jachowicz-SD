import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseItem } from '../models/purchase-item';
import { ProductService } from "../product.service";
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

  constructor(private router: Router, private productService: ProductService) {}

  onSubmit() {
    console.log("Wysyłane dane:", this.purchaseItem);

    if (!this.purchaseItem.productName || this.purchaseItem.price <= 0 || !this.purchaseItem.store || !this.purchaseItem.purchaseDate) {
      alert("Proszę wypełnić wszystkie pola poprawnie.");
      return;
    }

    // Wyślij żądanie do backendu
    this.productService.addProduct(this.purchaseItem).subscribe(response => {
      console.log("Odpowiedź z backendu:", response);
      alert("Zakup został dodany!");

      this.purchaseItem = { productName: '', price: 0, store: '', purchaseDate: '' };
    }, error => {
      console.error("Błąd podczas dodawania produktu:", error);
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}