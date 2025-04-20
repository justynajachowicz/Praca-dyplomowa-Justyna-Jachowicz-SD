import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { ShoppingListService } from '../services/shopping.service';
import { ShoppingListItem } from '../models/shopping-list-item';
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import { ProductService } from '../product.service';
import { Product } from '../models/models';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Dodaj FormsModule
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList: ShoppingListItem[] = [];
  filteredList: ShoppingListItem[] = [];
  userEmail: string = '';
  selectedCity: string = '';
  searchTerm: string = '';
  products: Product[] = [];

  // Variables for planned shopping
  shoppingPlanned: boolean = false;
  plannedShoppingStores: string[] = [];
  plannedShoppingItems: { [store: string]: ShoppingListItem[] } = {};

  constructor(
    private shoppingListService: ShoppingListService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');

    // Pobierz miasto z parametrów URL lub localStorage
    this.route.queryParams.subscribe(params => {
      if (params['city']) {
        this.selectedCity = params['city'];
        localStorage.setItem('selectedCity', this.selectedCity);
      } else {
        const storedCity = localStorage.getItem('selectedCity');
        if (storedCity) {
          this.selectedCity = storedCity;
        }
      }
    });

    if (email) {
      this.userEmail = email;
      this.loadShoppingList();
      this.loadProducts(); // Załaduj produkty dla wybranego miasta
    }
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

  // Załaduj produkty dla wybranego miasta
  loadProducts(): void {
    if (this.selectedCity) {
      this.productService.findCheapestProducts('', '', '', this.selectedCity).subscribe(
        (products) => {
          if (Array.isArray(products)) {
            this.products = products;
            console.log('Produkty dla miasta ' + this.selectedCity + ':', this.products);
          }
        },
        (error) => {
          console.error('Błąd podczas pobierania produktów:', error);
        }
      );
    }
  }

  // Filtruj elementy listy zakupów według miasta i wyszukiwanego terminu
  filterItems(): void {
    this.filteredList = this.shoppingList.filter(item => {
      // Filtruj według miasta, jeśli wybrano miasto
      const cityMatch = !this.selectedCity || 
                        (item.city && item.city.toLowerCase() === this.selectedCity.toLowerCase());

      // Filtruj według wyszukiwanego terminu, jeśli podano
      const searchMatch = !this.searchTerm || 
                         (item.productName && item.productName.toLowerCase().includes(this.searchTerm.toLowerCase()));

      return cityMatch && searchMatch;
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

  // Metoda do planowania zakupów
  planShopping(): void {
    // Resetuj poprzednie planowanie
    this.plannedShoppingItems = {};
    this.plannedShoppingStores = [];

    // Grupuj produkty według sklepów
    const storeGroups: { [store: string]: ShoppingListItem[] } = {};

    this.filteredList.forEach(item => {
      const store = item.storeName;
      if (!storeGroups[store]) {
        storeGroups[store] = [];
      }
      storeGroups[store].push(item);
    });

    // Zapisz pogrupowane produkty
    this.plannedShoppingItems = storeGroups;
    this.plannedShoppingStores = Object.keys(storeGroups);

    // Oznacz, że zakupy zostały zaplanowane
    this.shoppingPlanned = true;

    console.log('Zakupy zaplanowane:', this.plannedShoppingItems);
  }

  // Metoda do resetowania planu zakupów
  resetPlan(): void {
    this.shoppingPlanned = false;
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
}
