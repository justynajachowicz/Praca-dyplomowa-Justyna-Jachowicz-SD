import { Component, OnInit } from '@angular/core';
import { Product } from '../models/models';
import { ProductService } from '../product.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-search',
    templateUrl: './product-search.component.html',
    imports: [
        CommonModule,
        FormsModule
    ],
    styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
    query: string = '';          // Nazwa produktu
    products: Product[] = [];    // Lista wyników
    errorMessage: string = '';   // Komunikaty o błędach
    startDate: string = '';      // Data początkowa (opcjonalnie)
    endDate: string = '';        // Data końcowa (opcjonalnie)
    selectedCity: string = '';   // Wybrane miasto (opcjonalnie)
    selectedProduct: any = null;
    userEmail: string = '';
    purchaseFormVisible: boolean = false;
    addingToList: boolean = false;
    successMessage: string = '';

    constructor(
        private productService: ProductService,
        private authService: AuthService,
        private router: Router
    ) {
        this.purchaseFormVisible = false;
    }

    ngOnInit(): void {
        // Pobierz email użytkownika z localStorage, jeśli istnieje
        const email = localStorage.getItem('userEmail');
        if (email) {
            this.userEmail = email;
        }
    }

    // Wyszukiwanie najtańszych produktów z opcjonalną filtracją po dacie i mieście
    searchProducts(): void {
        if (this.query.trim()) {
            this.addingToList = false;
            this.successMessage = '';
            this.productService.findCheapestProducts(this.query, this.startDate, this.endDate, this.selectedCity).subscribe(
                (products) => {
                    if (Array.isArray(products)) {
                        this.products = products;
                        console.log('Najtańsze produkty:', this.products);

                        // Grupowanie produktów według miasta dla porównania cen
                        if (this.products.length > 0) {
                            console.log('Porównanie cen w różnych miastach:');
                            const productsByCity = this.groupProductsByCity(this.products);
                            console.log(productsByCity);
                        }
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

    // Grupowanie produktów według miasta dla porównania cen
    private groupProductsByCity(products: Product[]): any {
        const groupedProducts: { [key: string]: Product[] } = {};

        products.forEach(product => {
            const city = product.city || 'Nieznane miasto';
            if (!groupedProducts[city]) {
                groupedProducts[city] = [];
            }
            groupedProducts[city].push(product);
        });

        return groupedProducts;
    }

    // Pobieranie unikalnych miast z listy produktów
    getUniqueCities(): string[] {
        const cities = new Set<string>();

        this.products.forEach(product => {
            const city = product.city || 'Nieznane miasto';
            cities.add(city);
        });

        return Array.from(cities);
    }

    // Pobieranie produktów dla danego miasta
    getProductsByCity(city: string): Product[] {
        return this.products.filter(product => {
            const productCity = product.city || 'Nieznane miasto';
            return productCity === city;
        });
    }

    openPurchaseForm(product: any): void {
        this.selectedProduct = product;
        this.purchaseFormVisible = true;
    }

    // Dodawanie produktu bezpośrednio do listy zakupów
    addToShoppingList(product: any): void {
        this.addingToList = true;
        this.selectedProduct = product;

        if (this.userEmail) {
            // Zapisz email użytkownika w localStorage
            localStorage.setItem('userEmail', this.userEmail);

            this.authService.isUserRegistered(this.userEmail).subscribe(isRegistered => {
                if (isRegistered) {
                    // Jeśli użytkownik jest zarejestrowany, dodaj produkt do listy zakupów
                    this.productService.addToShoppingList(product, this.userEmail).subscribe(
                        response => {
                            console.log('Produkt dodany do listy zakupów:', response);
                            this.successMessage = 'Produkt został dodany do Twojej listy zakupów!';
                            this.addingToList = false;

                            // Opcjonalnie: przekieruj do listy zakupów po krótkim opóźnieniu
                            setTimeout(() => {
                                this.router.navigate(['/shopping-list']);
                            }, 2000);
                        },
                        error => {
                            console.error('Błąd podczas dodawania produktu:', error);
                            this.errorMessage = 'Nie udało się dodać produktu do listy zakupów.';
                            this.addingToList = false;
                        }
                    );
                } else {
                    alert('Musisz być zarejestrowany, aby dodać produkt do listy zakupów.');
                    this.addingToList = false;
                }
            });
        } else {
            alert('Proszę podać e-mail!');
            this.addingToList = false;
        }
    }

    // Metoda submitPurchase() do obsługi formularza
    submitPurchase() {
        if (this.userEmail) {
            // Zapisz email użytkownika w localStorage
            localStorage.setItem('userEmail', this.userEmail);

            this.authService.isUserRegistered(this.userEmail).subscribe(isRegistered => {
                if (isRegistered) {
                    // Jeśli użytkownik jest zarejestrowany, dodaj produkt do listy zakupów
                    this.productService.addToShoppingList(this.selectedProduct, this.userEmail).subscribe(response => {
                        console.log('Produkt dodany do listy zakupów:', response);
                        this.purchaseFormVisible = false; // Zamknij formularz
                        this.successMessage = 'Produkt został dodany do Twojej listy zakupów!';

                        // Opcjonalnie: przekieruj do listy zakupów po krótkim opóźnieniu
                        setTimeout(() => {
                            this.router.navigate(['/shopping-list']);
                        }, 2000);
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
    }

    // Przejdź do listy zakupów
    goToShoppingList() {
        // Jeśli wybrano miasto, przekaż je jako parametr
        if (this.selectedCity) {
            this.router.navigate(['/shopping-list'], { 
                queryParams: { city: this.selectedCity }
            });
        } else {
            this.router.navigate(['/shopping-list']);
        }
    }

    // Metoda wywoływana po wyborze miasta
    onCitySelected() {
        if (this.selectedCity && this.userEmail) {
            localStorage.setItem('userEmail', this.userEmail);
            localStorage.setItem('selectedCity', this.selectedCity);

            // Automatycznie przejdź do listy zakupów po wyborze miasta
            this.goToShoppingList();
        }
    }
}
