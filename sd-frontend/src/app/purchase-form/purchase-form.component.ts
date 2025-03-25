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
    // Przykładowa logika do obsługi formularza
    console.log('Form submitted', this.purchaseItem);

    // Możesz tu wysłać dane do backendu za pomocą serwisu HTTP, np.:
    // this.purchaseService.addPurchase(this.purchaseItem).subscribe(response => {
    //   // Przekierowanie po pomyślnym dodaniu
    //   this.router.navigate(['/']);
    // });
  }
}