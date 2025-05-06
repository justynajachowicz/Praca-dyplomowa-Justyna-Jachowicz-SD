import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../product.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./purchase-form.component.css']
})
export class PurchaseFormComponent {
  constructor(private router: Router, private productService: ProductService) {
  }

  goBack() {
    this.router.navigate(['/']);
  }

  goToProductSearch() {
    this.router.navigate(['/product-search']); // Przekierowanie na stronę wyszukiwania produktów
  }
}