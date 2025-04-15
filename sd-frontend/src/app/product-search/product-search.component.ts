import { Component } from '@angular/core';
import { Product } from '../models/models';
import { ProductService } from '../product.service';
import { AuthService } from '../services/auth.service';  // Dodaj AuthService
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
    selectedProduct: any = null;
    userEmail: string = '';
    purchaseFormVisible: boolean = false;

    constructor(
        private productService: ProductService,
        private authService: AuthService  // Dodaj AuthService do konstruktora
    ) {
        this.purchaseFormVisible = false;
    }

    // Wyszukiwanie najtańszych produktów z opcjonalną filtracją po dacie
    searchProducts(): void {
        if (this.query.trim()) {
            this.productService.findCheapestProducts(this.query, this.startDate, this.endDate).subscribe(
                (products) => {
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

    openPurchaseForm(product: any): void {
        this.selectedProduct = product;
        this.purchaseFormVisible = true;
    }

    // Jedna metoda submitPurchase() do obsługi formularza
    submitPurchase() {
        if (this.userEmail) {
            this.authService.isUserRegistered(this.userEmail).subscribe(isRegistered => {
                if (isRegistered) {
                    // Jeśli użytkownik jest zarejestrowany, dodaj produkt do listy zakupów
                    this.productService.addToShoppingList(this.selectedProduct, this.userEmail).subscribe(response => {
                        console.log('Produkt dodany do listy zakupów:', response);
                        this.purchaseFormVisible = false; // Zamknij formularz
                    });
                } else {
                    alert('Musisz być zarejestrowany, aby dodać produkt do listy zakupów.');
                }
            });
        } else {
            alert('Proszę podać e-mail!');
        }
    }

    closePurchaseForm() {
        this.purchaseFormVisible = false;
        this.selectedProduct = null;
        this.userEmail = '';
    }
}