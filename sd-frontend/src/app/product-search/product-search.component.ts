import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/models';
import { ProductService } from '../product.service';
import { AuthService } from '../services/auth.service';
import { FavoriteService } from '../services/favorite.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-product-search',
    templateUrl: './product-search.component.html',
    imports: [
        CommonModule,
        FormsModule
    ],
    styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit, OnDestroy {
    query: string = '';          // Nazwa produktu
    products: Product[] = [];    // Lista wyników
    errorMessage: string = '';   // Komunikaty o błędach
    selectedCity: string = '';   // Wybrane miasto (opcjonalnie)
    selectedProduct: any = null;
    userEmail: string = '';
    purchaseFormVisible: boolean = false;
    addingToList: boolean = false;
    successMessage: string = '';

    // For debouncing search input
    private searchTerms = new Subject<string>();
    private searchSubscription: Subscription | null = null;
    isLoading: boolean = false;

    constructor(
        private productService: ProductService,
        public authService: AuthService,
        private favoriteService: FavoriteService,
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

        // Pobierz miasto z localStorage, jeśli istnieje
        const storedCity = localStorage.getItem('selectedCity');
        if (storedCity) {
            this.selectedCity = storedCity;
        }

        // Załaduj wszystkie produkty przy inicjalizacji komponentu
        this.loadAllProducts();

        // Ustaw subskrypcję dla wyszukiwania podczas wpisywania
        this.searchSubscription = this.searchTerms.pipe(
            // Poczekaj 300ms po każdym naciśnięciu klawisza
            debounceTime(300),
            // Ignoruj, jeśli termin wyszukiwania się nie zmienił
            distinctUntilChanged()
        ).subscribe(() => {
            this.searchProducts();
        });
    }

    // Metoda do ładowania wszystkich produktów
    loadAllProducts(): void {
        this.productService.getProducts().subscribe(
            (products) => {
                if (Array.isArray(products)) {
                    this.products = this.removeDuplicateProductNames(products);
                    console.log('Wszystkie produkty (bez duplikatów):', this.products);
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

    // Metoda do usuwania duplikatów nazw produktów
    private removeDuplicateProductNames(products: Product[]): Product[] {
        const uniqueProductNames = new Set<string>();
        return products.filter(product => {
            const productName = product.name ? product.name.toLowerCase() : '';
            if (productName && !uniqueProductNames.has(productName)) {
                uniqueProductNames.add(productName);
                return true;
            }
            return false;
        });
    }

    // Wyszukiwanie najtańszych produktów z opcjonalną filtracją po mieście
    searchProducts(): void {
        if (this.query.trim()) {
            this.addingToList = false;
            this.successMessage = '';
            this.isLoading = true;
            this.productService.findCheapestProducts(this.query, '', '', this.selectedCity).subscribe(
                (products) => {
                    this.isLoading = false;
                    if (Array.isArray(products)) {
                        // Filtruj produkty, aby pokazać tylko dokładne dopasowanie do zapytania
                        const searchTerm = this.query.trim().toLowerCase();

                        // Najpierw filtruj produkty według kryteriów wyszukiwania
                        const filteredProducts = products.filter(product => {
                            // Pobierz nazwę produktu lub użyj pustego stringa jeśli brak nazwy
                            const productName = product.name ? product.name.toLowerCase() : '';

                            // Sprawdź, czy wyszukiwany termin występuje jako całe słowo
                            const wordBoundaryRegex = new RegExp(`\\b${searchTerm}\\b`, 'i');

                            // Sprawdź, czy nazwa produktu zaczyna się od wyszukiwanego terminu
                            const startsWithTerm = productName.startsWith(searchTerm);

                            // Sprawdź, czy wyszukiwany termin występuje jako całe słowo lub na początku nazwy
                            return wordBoundaryRegex.test(productName) || startsWithTerm;
                        });

                        // Następnie usuń duplikaty nazw produktów
                        this.products = this.removeDuplicateProductNames(filteredProducts);

                        console.log('Najtańsze produkty po filtrowaniu:', this.products);

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
                    this.isLoading = false;
                    this.errorMessage = 'Błąd podczas pobierania produktów';
                    console.error('Błąd podczas pobierania produktów:', error);
                }
            );
        } else {
            this.products = [];
        }
    }

    // Metoda do wyszukiwania produktów podczas wpisywania
    searchProductsAsYouType(): void {
        this.searchTerms.next(this.query);
    }

    ngOnDestroy(): void {
        // Unsubscribe to prevent memory leaks
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
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
                    this.productService.addToShoppingList(this.selectedProduct, this.userEmail).subscribe(
                        response => {
                            console.log('Produkt dodany do listy zakupów:', response);
                            this.purchaseFormVisible = false; // Zamknij formularz
                            this.successMessage = 'Produkt został dodany do Twojej listy zakupów!';

                            // Opcjonalnie: przekieruj do listy zakupów po krótkim opóźnieniu
                            setTimeout(() => {
                                this.router.navigate(['/shopping-list']);
                            }, 2000);
                        },
                        error => {
                            console.error('Błąd podczas dodawania produktu:', error);
                            this.errorMessage = 'Nie udało się dodać produktu do listy zakupów.';
                            this.purchaseFormVisible = false;
                        }
                    );
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
        // Pobierz miasto z localStorage, jeśli istnieje
        const storedCity = localStorage.getItem('selectedCity');

        if (storedCity) {
            this.router.navigate(['/shopping-list'], { 
                queryParams: { city: storedCity }
            });
        } else {
            this.router.navigate(['/shopping-list']);
        }
    }

    // Dodaj produkt do ulubionych
    addToFavorites(product: any): void {
        if (!this.userEmail) {
            alert('Proszę podać e-mail!');
            return;
        }

        // Zapisz email użytkownika w localStorage
        localStorage.setItem('userEmail', this.userEmail);

        this.authService.isUserRegistered(this.userEmail).subscribe(isRegistered => {
            if (isRegistered) {
                // Jeśli użytkownik jest zarejestrowany i nie jest adminem
                if (!this.authService.isAdmin()) {
                    this.favoriteService.addToFavorites(product, this.userEmail).subscribe(
                        response => {
                            console.log('Produkt dodany do ulubionych:', response);
                            this.successMessage = 'Produkt został dodany do Twoich ulubionych!';

                            // Wyczyść komunikat po 3 sekundach
                            setTimeout(() => {
                                this.successMessage = '';
                            }, 3000);
                        },
                        error => {
                            console.error('Błąd podczas dodawania do ulubionych:', error);
                            alert('Nie udało się dodać produktu do ulubionych.');
                        }
                    );
                } else {
                    alert('Administratorzy nie mogą dodawać produktów do ulubionych.');
                }
            } else {
                alert('Musisz być zarejestrowany, aby dodać produkt do ulubionych.');
            }
        });
    }
}
