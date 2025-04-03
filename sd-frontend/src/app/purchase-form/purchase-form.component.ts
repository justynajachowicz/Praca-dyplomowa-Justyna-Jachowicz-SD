import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseItem } from '../models/purchase-item';
import { ProductService } from "../product.service";
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

  constructor(private router: Router, private productService: ProductService) {
  }

  onSubmit() {
    console.log("Wysyłane dane:", this.purchaseItem);

    if (!this.purchaseItem.productName || this.purchaseItem.price <= 0 || !this.purchaseItem.store || !this.purchaseItem.purchaseDate) {
      alert("Proszę wypełnić wszystkie pola poprawnie.");
      return;
    }

    // Wyślij żądanie do backendu
    this.productService.addProduct(this.purchaseItem).subscribe(response => {
      console.log("Odpowiedź z backendu:", response);
      alert("Zakup został dodany!");

      this.purchaseItem = {productName: '', price: 0, store: '', purchaseDate: ''};
    }, error => {
      console.error("Błąd podczas dodawania produktu:", error);
    });
  }

  generateMultipleFakeReceipts() {
    for (let i = 0; i < 200; i++) {
      const fakeReceipt = this.generateFakeReceipt(); // Generujemy 1 paragon
      this.productService.addProduct(fakeReceipt).subscribe(response => {
        console.log(`Dodano paragon ${i + 1}:`, response);
      }, error => {
        console.error(`Błąd przy dodawaniu paragonu ${i + 1}:`, error);
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  // Generowanie pojedynczego paragonu
  generateFakeReceipt(): any {
    const exampleProducts = [
      {
        name: "Mleko Łaciate 3,2%",
        minPrice: 2.99,
        maxPrice: 4.99,
        stores: ["Biedronka", "Lidl", "Auchan"],
        imageUrl: "https://example.com/laciate.jpg"
      },
      {
        name: "Chleb wiejski",
        minPrice: 1.99,
        maxPrice: 3.49,
        stores: ["Lidl", "Biedronka", "Carrefour"],
        imageUrl: "https://example.com/chleb.jpg"
      },
      {
        name: "Masło ekstra Mlekovita",
        minPrice: 4.99,
        maxPrice: 6.99,
        stores: ["Auchan", "Lidl", "Zabka"],
        imageUrl: "https://example.com/maslo.jpg"
      },
      {
        name: "Jajka z wolnego wybiegu",
        minPrice: 6.49,
        maxPrice: 9.49,
        stores: ["Biedronka", "Carrefour", "Lidl"],
        imageUrl: "https://example.com/jajka.jpg"
      },
      {
        name: "Szynka babuni",
        minPrice: 10.99,
        maxPrice: 14.99,
        stores: ["Lidl", "Auchan", "Tesco"],
        imageUrl: "https://example.com/szynka.jpg"
      },
      {
        name: "Ser Gouda",
        minPrice: 7.99,
        maxPrice: 11.99,
        stores: ["Auchan", "Lidl", "Carrefour"],
        imageUrl: "https://example.com/gouda.jpg"
      },
      {
        name: "Makaron Lubella",
        minPrice: 2.49,
        maxPrice: 3.79,
        stores: ["Biedronka", "Tesco", "Carrefour"],
        imageUrl: "https://example.com/makaron.jpg"
      },
      {
        name: "Woda Żywiec Zdrój",
        minPrice: 1.49,
        maxPrice: 2.49,
        stores: ["Lidl", "Biedronka", "Carrefour"],
        imageUrl: "https://example.com/zywiec.jpg"
      },
      {
        name: "Czekolada Wedel",
        minPrice: 3.49,
        maxPrice: 5.49,
        stores: ["Auchan", "Lidl", "Zabka"],
        imageUrl: "https://example.com/wedel.jpg"
      },
      {
        name: "Piwo Żywiec",
        minPrice: 5.99,
        maxPrice: 7.99,
        stores: ["Biedronka", "Auchan", "Lidl"],
        imageUrl: "https://example.com/zywiec-piwo.jpg"
      }
    ];

    // Losowanie produktu
    const randomProduct = exampleProducts[Math.floor(Math.random() * exampleProducts.length)];

    // Losowanie ceny w zadanym zakresie (minPrice, maxPrice)
    const randomPrice = (Math.random() * (randomProduct.maxPrice - randomProduct.minPrice) + randomProduct.minPrice).toFixed(2);

    // Losowanie sklepu z dostępnych sklepów
    const randomStore = randomProduct.stores[Math.floor(Math.random() * randomProduct.stores.length)];

    // Zwracamy obiekt z danymi dla jednego paragonu
    return {
      productName: randomProduct.name,
      price: parseFloat(randomPrice),
      store: randomStore,
      purchaseDate: new Date().toISOString().split('T')[0], // Bieżąca data w formacie YYYY-MM-DD
      imageUrl: randomProduct.imageUrl
    };
  }
}