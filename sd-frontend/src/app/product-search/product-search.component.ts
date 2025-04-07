import { Component } from '@angular/core';
import { Product } from '../models/models';
import { ProductService } from '../product.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-product-search',
    templateUrl: './product-search.component.html',
    imports: [
        CommonModule,
        FormsModule
    ],
    styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent {
    searchQuery: string = '';
    products: Product[] = [];
    errorMessage: string = '';  // Deklaracja zmiennej errorMessage

    query: string = '';

    constructor(private productService: ProductService) {}

    searchProducts(): void {
        if (this.query.trim()) {
            this.productService.findCheapestProducts(this.query).subscribe(
                (products) => {
                    this.products = products;
                    console.log('Najtańsze produkty:', this.products);
                },
                (error) => {
                    console.error('Błąd podczas pobierania produktów:', error);
                }
            );
        }
    }


}