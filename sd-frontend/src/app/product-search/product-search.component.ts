import { Component } from '@angular/core';
import { Product } from '../models/models';
import { ProductService } from '../product.service';
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
    query: string = '';          // Nazwa produktu
    products: Product[] = [];    // Lista wyników
    errorMessage: string = '';   // Komunikaty o błędach
    startDate: string = '';      // Data początkowa (opcjonalnie)
    endDate: string = '';        // Data końcowa (opcjonalnie)


    constructor(private productService: ProductService) {}

    // Wyszukiwanie najtańszych produktów z opcjonalną filtracją po dacie
    searchProducts(): void {
        if (this.query.trim()) {
            // Przekazujemy trzy argumenty do metody findCheapestProducts
            this.productService.findCheapestProducts(this.query, this.startDate, this.endDate).subscribe(
                (products) => {
                    // Logowanie odpowiedzi serwera
                    console.log('Odpowiedź z serwera:', products);

                    // Jeżeli odpowiedź jest prawidłowa, przypisujemy ją do 'products'
                    if (Array.isArray(products)) {
                        this.products = products;
                        console.log('Najtańsze produkty:', this.products);
                    } else {
                        console.error('Odpowiedź z serwera nie jest tablicą.');
                        this.errorMessage = 'Brak produktów w odpowiedzi.';
                    }
                },
                (error) => {
                    this.errorMessage = 'Błąd podczas pobierania produktów';
                    console.error('Błąd podczas pobierania produktów:', error);
                }
            );
        }
    }
}