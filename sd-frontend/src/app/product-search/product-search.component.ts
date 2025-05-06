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
    categorizedProducts: { [category: string]: Product[] } = {}; // Produkty pogrupowane według kategorii
    categories: string[] = [];   // Lista kategorii
    expandedCategories: { [category: string]: boolean } = {}; // Śledzi, które kategorie są rozwinięte
    errorMessage: string = '';   // Komunikaty o błędach
    selectedCity: string = '';   // Wybrane miasto (opcjonalnie)
    selectedProduct: any = null;
    userEmail: string = '';
    userPassword: string = '';   // Hasło użytkownika
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

    // Metoda do przełączania widoczności kategorii
    toggleCategory(category: string): void {
        this.expandedCategories[category] = !this.expandedCategories[category];
    }

    // Sprawdza, czy kategoria jest rozwinięta
    isCategoryExpanded(category: string): boolean {
        return this.expandedCategories[category] === true;
    }

    // Metoda do kategoryzacji produktów
    private categorizeProducts(products: Product[], isSearchResult: boolean = false): void {
        // Resetuj kategoryzację
        this.categorizedProducts = {};
        this.categories = [];

        // Definicje kategorii
        const categories: { [key: string]: string[] } = {
            'Nabiał': ['mleko', 'masło', 'ser'],
            'Mięso': ['szynka'],
            'Napoje': ['woda', 'coca cola'],
            'Pieczywo': ['chleb'],
            'Makarony': ['makaron'],
            'Jajka': ['jajko', 'jajka'],
            'Słodycze': ['czekolad'],
            'Warzywa i owoce': ['pomidor', 'ogórek', 'ziemniak']
        };

        // Przypisz każdy produkt do odpowiedniej kategorii
        products.forEach(product => {
            const productName = product.name ? product.name.toLowerCase() : '';
            let assigned = false;

            for (const [category, keywords] of Object.entries(categories)) {
                for (const keyword of keywords) {
                    if (productName.includes(keyword)) {
                        if (!this.categorizedProducts[category]) {
                            this.categorizedProducts[category] = [];
                        }
                        this.categorizedProducts[category].push(product);
                        assigned = true;
                        break;
                    }
                }
                if (assigned) break;
            }

            // Jeśli produkt nie pasuje do żadnej kategorii, dodaj go do kategorii "Inne"
            if (!assigned) {
                if (!this.categorizedProducts['Inne']) {
                    this.categorizedProducts['Inne'] = [];
                }
                this.categorizedProducts['Inne'].push(product);
            }
        });

        // Ustaw listę kategorii
        this.categories = Object.keys(this.categorizedProducts);

        // Inicjalizuj expandedCategories
        this.categories.forEach(category => {
            // Jeśli to wynik wyszukiwania, rozwiń wszystkie kategorie zawierające produkty
            // W przeciwnym razie, wszystkie kategorie są początkowo zwinięte
            this.expandedCategories[category] = isSearchResult;
        });
    }

    // Metoda do ładowania wszystkich produktów
    loadAllProducts(): void {
        // Use findCheapestProducts with empty query and selected city to filter products by city
        this.productService.findCheapestProducts('', '', '', this.selectedCity).subscribe(
            (products) => {
                if (Array.isArray(products)) {
                    this.products = this.removeDuplicateProductNames(products);
                    console.log(`Wszystkie produkty dla miasta ${this.selectedCity} (bez duplikatów):`, this.products);

                    // Kategoryzuj produkty
                    this.categorizeProducts(this.products);
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

                        // Kategoryzuj produkty i automatycznie rozwiń kategorie zawierające wyniki wyszukiwania
                        this.categorizeProducts(this.products, true);

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
            // Resetuj kategoryzację gdy nie ma zapytania
            this.categorizedProducts = {};
            this.categories = [];
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

        if (!this.userEmail) {
            alert('Proszę podać e-mail!');
            this.addingToList = false;
            return;
        }

        // Zapisz email użytkownika w localStorage
        localStorage.setItem('userEmail', this.userEmail);

        // Walidacja tylko emaila
        this.authService.isUserRegistered(this.userEmail).subscribe(isRegistered => {
            if (isRegistered) {
                // Jeśli użytkownik jest zarejestrowany, dodaj produkt do listy zakupów
                this.productService.addToShoppingList(product, this.userEmail).subscribe(
                    response => {
                        console.log('Produkt dodany do listy zakupów:', response);
                        this.successMessage = 'Produkt został dodany do Twojej listy zakupów!';
                        this.addingToList = false;

                        // Przekieruj do listy zakupów po dłuższym opóźnieniu, aby dać czas na zapisanie produktu w bazie danych
                        setTimeout(() => {
                            this.router.navigate(['/shopping-list']);
                        }, 3500);
                    },
                    error => {
                        console.error('Błąd podczas dodawania produktu:', error);
                        this.errorMessage = 'Nie udało się dodać produktu do listy zakupów.';
                        this.addingToList = false;
                    }
                );
            } else {
                alert('Nieprawidłowy email. Użytkownik nie jest zarejestrowany.');
                this.addingToList = false;
            }
        });
    }

    // Metoda submitPurchase() do obsługi formularza
    submitPurchase() {
        if (!this.userEmail) {
            alert('Proszę podać e-mail!');
            return;
        }

        // Zapisz email użytkownika w localStorage
        localStorage.setItem('userEmail', this.userEmail);

        // Walidacja tylko emaila
        this.authService.isUserRegistered(this.userEmail).subscribe(isRegistered => {
            if (isRegistered) {
                // Jeśli użytkownik jest zarejestrowany, dodaj produkt do listy zakupów
                this.productService.addToShoppingList(this.selectedProduct, this.userEmail).subscribe(
                    response => {
                        console.log('Produkt dodany do listy zakupów:', response);
                        this.purchaseFormVisible = false; // Zamknij formularz
                        this.successMessage = 'Produkt został dodany do Twojej listy zakupów!';

                        // Przekieruj do listy zakupów po dłuższym opóźnieniu, aby dać czas na zapisanie produktu w bazie danych
                        setTimeout(() => {
                            this.router.navigate(['/shopping-list']);
                        }, 3500);
                    },
                    error => {
                        console.error('Błąd podczas dodawania produktu:', error);
                        this.errorMessage = 'Nie udało się dodać produktu do listy zakupów.';
                        this.purchaseFormVisible = false;
                    }
                );
            } else {
                alert('Nieprawidłowy email. Użytkownik nie jest zarejestrowany.');
            }
        });
    }

    closePurchaseForm() {
        this.purchaseFormVisible = false;
        this.selectedProduct = null;
    }

    // Przejdź do listy zakupów
    goToShoppingList() {
        if (!this.userEmail) {
            alert('Proszę podać e-mail, aby przejść do listy zakupów!');
            return;
        }

        // Zapisz email użytkownika w localStorage
        localStorage.setItem('userEmail', this.userEmail);

        // Walidacja tylko emaila
        this.authService.isUserRegistered(this.userEmail).subscribe(isRegistered => {
            if (isRegistered) {
                // Pobierz miasto z localStorage, jeśli istnieje
                const storedCity = localStorage.getItem('selectedCity');

                if (storedCity) {
                    this.router.navigate(['/shopping-list'], { 
                        queryParams: { city: storedCity }
                    });
                } else {
                    this.router.navigate(['/shopping-list']);
                }
            } else {
                alert('Nieprawidłowy email. Użytkownik nie jest zarejestrowany.');
            }
        });
    }

    // Przejdź do ulubionych produktów
    goToFavorites() {
        if (!this.userEmail) {
            alert('Proszę podać e-mail, aby przejść do ulubionych produktów!');
            return;
        }

        // Zapisz email użytkownika w localStorage
        localStorage.setItem('userEmail', this.userEmail);

        // Walidacja tylko emaila
        this.authService.isUserRegistered(this.userEmail).subscribe(isRegistered => {
            if (isRegistered) {
                this.router.navigate(['/favorites']);
            } else {
                alert('Nieprawidłowy email. Użytkownik nie jest zarejestrowany.');
            }
        });
    }

    // Dodaj produkt do ulubionych
    addToFavorites(product: any): void {
        if (!this.userEmail) {
            alert('Proszę podać e-mail!');
            return;
        }

        // Zapisz email użytkownika w localStorage
        localStorage.setItem('userEmail', this.userEmail);

        // Walidacja tylko emaila
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
                alert('Nieprawidłowy email. Użytkownik nie jest zarejestrowany.');
            }
        });
    }
}
