import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { ShoppingListService } from '../services/shopping.service';
import { ShoppingListItem } from '../models/shopping-list-item';
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import { ProductService } from '../product.service';
import { Product } from '../models/models';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FavoriteService } from '../services/favorite.service';
import { ShoppingService } from './shopping.service';
import { Observable, forkJoin, of, catchError, map } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Dodaj FormsModule i RouterModule
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingService]
})
export class ShoppingListComponent implements OnInit {
  @ViewChild('plannedShoppingContent') plannedShoppingContent!: ElementRef;

  shoppingList: ShoppingListItem[] = [];
  filteredList: ShoppingListItem[] = [];
  userEmail: string = '';
  searchTerm: string = '';
  userCity: string = '';

  // Variables for store selection
  storeSelectionActive: boolean = false;
  availableStores: string[] = [];
  selectedStore: string = '';

  // Variables for planned shopping
  shoppingPlanned: boolean = false;
  plannedShoppingStores: string[] = [];
  plannedShoppingItems: { [store: string]: ShoppingListItem[] } = {};
  storeAddresses: { [store: string]: string } = {};

  constructor(
    private shoppingListService: ShoppingListService,
    private productService: ProductService,
    public favoriteService: FavoriteService,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    const city = localStorage.getItem('userCity');

    if (email) {
      this.userEmail = email;
      this.loadShoppingList();
    }

    // Initialize user city from localStorage
    this.userCity = city || ''; // No default city
  }

  loadShoppingList(): void {
    this.shoppingListService.getShoppingList(this.userEmail).subscribe({
      next: (data: ShoppingListItem[]) => {
        console.log('Dane z backendu:', data);  // Sprawdź, czy dane są poprawne
        this.shoppingList = data;
        this.filteredList = [...this.shoppingList]; // Inicjalizuj filteredList
        this.filterItems(); // Filtruj elementy po załadowaniu
      },
      error: (err: any) => console.error('Błąd podczas pobierania listy zakupów:', err)
    });
  }


  // Filtruj elementy listy zakupów według wyszukiwanego terminu
  filterItems(): void {
    this.filteredList = this.shoppingList.filter(item => {
      // Filtruj według wyszukiwanego terminu, jeśli podano
      return !this.searchTerm || 
             (item.productName && item.productName.toLowerCase().includes(this.searchTerm.toLowerCase()));
    });
  }

  // Metoda wywoływana przy zmianie wyszukiwanego terminu
  onSearchChange(): void {
    this.filterItems();
  }

  refreshList(): void {
    if (this.userEmail) {
      this.loadShoppingList();
    }
  }

  removeItem(item: ShoppingListItem): void {
    if (!item.id) {
      console.error('Nie można usunąć przedmiotu bez ID');
      return;
    }

    console.log('Usuwanie przedmiotu:', item);
    this.shoppingListService.removeItem(item.id).subscribe({
      next: () => {
        console.log('Przedmiot usunięty pomyślnie');
        this.refreshList();
      },
      error: (err) => {
        console.error('Błąd podczas usuwania przedmiotu:', err);
      }
    });
  }

  removeAllItems(): void {
    if (!this.userEmail) {
      console.error('Nie można usunąć przedmiotów bez adresu email użytkownika');
      return;
    }

    if (confirm('Czy na pewno chcesz usunąć wszystkie produkty z listy zakupów?')) {
      console.log('Usuwanie wszystkich przedmiotów dla użytkownika:', this.userEmail);
      this.shoppingListService.removeAllItems(this.userEmail).subscribe({
        next: () => {
          console.log('Wszystkie przedmioty usunięte pomyślnie');
          this.refreshList();
        },
        error: (err) => {
          console.error('Błąd podczas usuwania wszystkich przedmiotów:', err);
        }
      });
    }
  }

  // Metoda do inicjowania wyboru sklepu
  initiateStoreSelection(): void {
    // Resetuj poprzednie planowanie
    this.plannedShoppingItems = {};
    this.plannedShoppingStores = [];
    this.storeAddresses = {};
    this.selectedStore = '';

    // Jeśli nie wybrano miasta, pokaż domyślną listę sklepów
    if (!this.userCity) {
      this.availableStores = ['Biedronka', 'Lidl', 'Żabka', 'Auchan', 'Carrefour'];
      this.storeSelectionActive = true;
      return;
    }

    // Pobierz dostępne sklepy w mieście użytkownika
    this.shoppingService.getStoresByCity(this.userCity).subscribe({
      next: (stores) => {
        this.availableStores = stores;
        this.storeSelectionActive = true;
        console.log('Dostępne sklepy:', this.availableStores);
      },
      error: (err) => {
        console.error('Błąd podczas pobierania sklepów:', err);
        // W przypadku błędu, użyj domyślnej listy sklepów
        this.availableStores = ['Biedronka', 'Lidl', 'Żabka', 'Auchan', 'Carrefour'];
        this.storeSelectionActive = true;
      }
    });
  }

  // Metoda do wyboru sklepu
  selectStore(store: string): void {
    this.selectedStore = store;
    this.planShopping();
  }

  // Metoda do planowania zakupów
  planShopping(): void {
    // Resetuj poprzednie planowanie
    this.plannedShoppingItems = {};
    this.plannedShoppingStores = [];
    this.storeAddresses = {};

    // Jeśli nie wybrano sklepu, pokaż wybór sklepu
    if (!this.selectedStore && !this.storeSelectionActive) {
      this.initiateStoreSelection();
      return;
    }

    // Tablica do przechowywania zapytań o produkty
    const productQueries: Observable<void>[] = [];

    // Jeśli nie wybrano miasta, użyj domyślnych danych produktu
    if (!this.userCity) {
      console.log(`Używam domyślnych danych dla produktów`);

      if (!this.plannedShoppingItems[this.selectedStore]) {
        this.plannedShoppingItems[this.selectedStore] = [];
      }

      // Dodaj wszystkie produkty z listy do wybranego sklepu
      this.filteredList.forEach(item => {
        const newItem: ShoppingListItem = {
          id: item.id,
          productName: item.productName,
          storeName: this.selectedStore,
          price: item.price || 0,
          quantity: item.quantity || 1
        };

        this.plannedShoppingItems[this.selectedStore].push(newItem);
      });

      // Ustaw domyślny adres sklepu
      this.storeAddresses[this.selectedStore] = `Adres sklepu ${this.selectedStore}`;

      // Aktualizuj listę sklepów
      this.plannedShoppingStores = Object.keys(this.plannedShoppingItems);

      // Oznacz, że zakupy zostały zaplanowane i zakończ wybór sklepu
      this.shoppingPlanned = true;
      this.storeSelectionActive = false;

      return;
    }

    // Jeśli wybrano miasto, znajdź najtańsze produkty dla każdego produktu z listy
    this.filteredList.forEach(item => {
      console.log(`Szukam najtańszych produktów dla ${item.productName} w mieście ${this.userCity}`);

      const query = this.shoppingService.findCheapestProductsByCity(item.productName, this.userCity).pipe(
        map(products => {
          if (products.length > 0) {
            // Sortuj produkty według ceny (od najtańszego)
            const sortedProducts = products.sort((a, b) => a.price - b.price);
            const cheapestProduct = sortedProducts[0];

            // Dodaj produkt do odpowiedniego sklepu
            const storeName = cheapestProduct.store;

            if (!this.plannedShoppingItems[storeName]) {
              this.plannedShoppingItems[storeName] = [];
            }

            // Utwórz nowy ShoppingListItem na podstawie najtańszego produktu
            const newItem: ShoppingListItem = {
              id: item.id,
              productName: item.productName,
              storeName: storeName,
              price: cheapestProduct.price,
              quantity: item.quantity || 1
            };

            this.plannedShoppingItems[storeName].push(newItem);

            // Pobierz adres sklepu, jeśli jeszcze nie został pobrany
            if (!this.storeAddresses[storeName]) {
              // Pobierz adres sklepu z API (który korzysta z tabeli receipts)
              this.shoppingService.getStoreAddress(storeName, this.userCity).subscribe(address => {
                this.storeAddresses[storeName] = address;
              });
            }
          }
        }),
        catchError(error => {
          console.error(`Błąd podczas wyszukiwania najtańszych produktów dla ${item.productName}:`, error);
          // W przypadku błędu, nie dodawaj produktu do listy zakupów
          return of(undefined);
        })
      );

      productQueries.push(query);
    });

    // Poczekaj na zakończenie wszystkich zapytań
    forkJoin(productQueries).subscribe({
      next: () => {
        // Aktualizuj listę sklepów
        this.plannedShoppingStores = Object.keys(this.plannedShoppingItems);

        // Oznacz, że zakupy zostały zaplanowane i zakończ wybór sklepu
        this.shoppingPlanned = true;
        this.storeSelectionActive = false;

        console.log('Zakupy zaplanowane:', this.plannedShoppingItems);
      },
      error: (err) => {
        console.error('Błąd podczas planowania zakupów:', err);
      }
    });
  }

  // Metoda do resetowania planu zakupów
  resetPlan(): void {
    this.shoppingPlanned = false;
    this.storeSelectionActive = false;
    this.selectedStore = '';
  }

  // Metoda do pobierania produktów dla danego sklepu
  getItemsByStore(store: string): ShoppingListItem[] {
    return this.plannedShoppingItems[store] || [];
  }

  // Metoda do obliczania sumy dla danego sklepu
  calculateStoreTotal(store: string): number {
    const items = this.getItemsByStore(store);
    return items.reduce((total, item) => total + item.price, 0);
  }

  // Metoda do obliczania całkowitego kosztu
  calculateTotalCost(): number {
    let total = 0;
    this.plannedShoppingStores.forEach(store => {
      total += this.calculateStoreTotal(store);
    });
    return total;
  }


  // Metoda do eksportu listy zakupów do PDF
  exportToPdf(): void {
    if (!this.shoppingPlanned) {
      // Jeśli zakupy nie są zaplanowane, najpierw je planujemy
      this.planShopping();
      // Dajemy chwilę na renderowanie widoku
      setTimeout(() => this.generatePdf(), 500);
    } else {
      this.generatePdf();
    }
  }

  // Dodawanie produktu do ulubionych
  addToFavorites(item: ShoppingListItem): void {
    if (!this.userEmail) {
      alert('Proszę zalogować się, aby dodać produkt do ulubionych.');
      return;
    }

    // Tworzymy obiekt produktu na podstawie ShoppingListItem
    const product = {
      productId: item.id,
      productName: item.productName,
      name: item.productName,
      price: item.price,
      brand: '',
      weight: '',
      imageUrl: '',
      store: item.storeName,
      products: []
    } as Product;

    this.favoriteService.addToFavorites(product, this.userEmail).subscribe({
      next: (response) => {
        console.log('Produkt dodany do ulubionych:', response);
        alert('Produkt został dodany do ulubionych.');
      },
      error: (err) => {
        console.error('Błąd podczas dodawania produktu do ulubionych:', err);
        alert('Nie udało się dodać produktu do ulubionych.');
      }
    });
  }

  // Generowanie PDF z zaplanowanych zakupów
  private generatePdf(): void {
    const content = this.plannedShoppingContent.nativeElement;

    html2canvas(content).then(canvas => {
      // Wymiary dokumentu A4
      const imgWidth = 210; 
      const pageHeight = 297;  
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      const pdf = new jsPDF('p', 'mm', 'a4');

      // Dodajemy tytuł
      pdf.setFontSize(18);
      pdf.text('Lista zakupów', 105, 15, { align: 'center' });

      // Dodajemy datę
      pdf.setFontSize(12);
      const today = new Date();
      const dateStr = today.toLocaleDateString('pl-PL');
      pdf.text(`Data: ${dateStr}`, 105, 25, { align: 'center' });

      // Dodajemy obraz z canvas
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 40, imgWidth, imgHeight);

      // Zapisujemy PDF
      pdf.save(`lista_zakupow_${dateStr.replace(/\//g, '-')}.pdf`);
    });
  }
}
