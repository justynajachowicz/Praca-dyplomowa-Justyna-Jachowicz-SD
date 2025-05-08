import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product, Shop } from '../models/models';
import { ShoppingService } from '../shopping-list/shopping.service';

@Injectable({
  providedIn: 'root'
})
export class ProductSimulationService {
  private apiUrl = environment.apiUrl;

  // Food categories and sample products for simulation
  private foodCategories = [
    'Nabiał', 'Pieczywo', 'Piekarnia', 'Mięso', 'Owoce', 'Warzywa', 'Napoje', 
    'Słodycze', 'Przekąski', 'Mrożonki', 'Mrożone', 'Konserwy', 'Przyprawy', 
    'Produkty zbożowe', 'Oleje i tłuszcze', 'Sosy', 'Dania gotowe', 'Artykuły spożywcze',
    'Drogeria', 'Dla domu', 'Dla dzieci'
  ];

  private brands = [
    'Mlekovita', 'Piątnica', 'Sokołów', 'Indykpol', 'Hortex', 'Tymbark', 
    'Wedel', 'Wawel', 'Lubella', 'Pudliszki', 'Kamis', 'Knorr', 
    'Krakus', 'Winiary', 'Łowicz', 'Kotlin', 'Bakalland', 'Bonduelle'
  ];

  private dairyProducts = ['Mleko', 'Ser żółty', 'Ser biały', 'Jogurt', 'Śmietana', 'Masło', 'Kefir', 'Maślanka'];
  private breadProducts = ['Chleb pszenny', 'Chleb żytni', 'Bułki', 'Bagietka', 'Ciabatta', 'Chleb tostowy', 'Rogaliki'];
  private meatProducts = ['Kurczak', 'Wołowina', 'Wieprzowina', 'Indyk', 'Kiełbasa', 'Parówki', 'Szynka', 'Boczek'];
  private fruitProducts = ['Jabłka', 'Banany', 'Pomarańcze', 'Gruszki', 'Winogrona', 'Truskawki', 'Maliny', 'Borówki'];
  private vegetableProducts = ['Pomidory', 'Ogórki', 'Marchew', 'Ziemniaki', 'Cebula', 'Papryka', 'Sałata', 'Brokuły'];
  private beverageProducts = ['Woda', 'Sok pomarańczowy', 'Sok jabłkowy', 'Cola', 'Herbata', 'Kawa', 'Napój energetyczny'];
  private sweetsProducts = ['Czekolada', 'Ciastka', 'Batony', 'Lody', 'Cukierki', 'Wafelki', 'Guma do żucia'];
  private snackProducts = ['Chipsy', 'Paluszki', 'Orzeszki', 'Krakersy', 'Popcorn', 'Precelki', 'Nachosy'];
  private frozenProducts = ['Pizza mrożona', 'Frytki', 'Warzywa mrożone', 'Lody', 'Pierogi', 'Kluski śląskie', 'Ryby mrożone'];
  private cannedProducts = ['Tuńczyk', 'Kukurydza', 'Groszek', 'Fasola', 'Pomidory krojone', 'Ananas', 'Brzoskwinie'];
  private spiceProducts = ['Pieprz', 'Sól', 'Bazylia', 'Oregano', 'Papryka słodka', 'Cynamon', 'Kurkuma', 'Curry'];
  private grainProducts = ['Ryż', 'Makaron', 'Kasza gryczana', 'Kasza jaglana', 'Płatki owsiane', 'Mąka pszenna', 'Mąka żytnia'];
  private oilProducts = ['Olej rzepakowy', 'Olej słonecznikowy', 'Oliwa z oliwek', 'Masło', 'Margaryna', 'Smalec'];
  private sauceProducts = ['Ketchup', 'Majonez', 'Musztarda', 'Sos sojowy', 'Sos pomidorowy', 'Sos czosnkowy', 'Sos słodko-kwaśny'];
  private readyMealsProducts = ['Zupa pomidorowa', 'Zupa ogórkowa', 'Bigos', 'Gołąbki', 'Flaki', 'Pulpety w sosie', 'Fasolka po bretońsku'];

  // New product categories
  private bakeryProducts = ['Chleb razowy', 'Bułki pszenne', 'Drożdżówki', 'Pączki', 'Croissanty', 'Chleb wieloziarnisty', 'Bułki grahamki', 'Chałka'];
  private frozenFoodProducts = ['Mrożona pizza', 'Mrożone warzywa', 'Lody familijne', 'Mrożone owoce', 'Mrożone pierogi', 'Mrożone ryby', 'Mrożone dania gotowe'];
  private groceryProducts = ['Cukier', 'Mąka', 'Sól', 'Ryż', 'Makaron', 'Kasza', 'Płatki śniadaniowe', 'Konserwy', 'Dżemy', 'Miód'];
  private drugsProducts = ['Szampon', 'Mydło', 'Pasta do zębów', 'Żel pod prysznic', 'Dezodorant', 'Papier toaletowy', 'Chusteczki', 'Kosmetyki'];
  private homeProducts = ['Środki czystości', 'Płyn do naczyń', 'Proszek do prania', 'Płyn do płukania', 'Mopy', 'Ściereczki', 'Worki na śmieci', 'Świece'];
  private childrenProducts = ['Pieluchy', 'Mleko modyfikowane', 'Kaszki dla dzieci', 'Słoiczki z jedzeniem', 'Soki dla dzieci', 'Zabawki', 'Akcesoria dla niemowląt'];

  private allProducts: { [key: string]: string[] } = {
    'Nabiał': this.dairyProducts,
    'Pieczywo': this.breadProducts,
    'Piekarnia': this.bakeryProducts,
    'Mięso': this.meatProducts,
    'Owoce': this.fruitProducts,
    'Warzywa': this.vegetableProducts,
    'Napoje': this.beverageProducts,
    'Słodycze': this.sweetsProducts,
    'Przekąski': this.snackProducts,
    'Mrożonki': this.frozenProducts,
    'Mrożone': this.frozenFoodProducts,
    'Konserwy': this.cannedProducts,
    'Przyprawy': this.spiceProducts,
    'Produkty zbożowe': this.grainProducts,
    'Oleje i tłuszcze': this.oilProducts,
    'Sosy': this.sauceProducts,
    'Dania gotowe': this.readyMealsProducts,
    'Artykuły spożywcze': this.groceryProducts,
    'Drogeria': this.drugsProducts,
    'Dla domu': this.homeProducts,
    'Dla dzieci': this.childrenProducts
  };

  private weights = ['100g', '250g', '500g', '1kg', '1.5kg', '2kg', '5kg', '10kg', '100ml', '250ml', '500ml', '1l', '1.5l', '2l'];

  constructor(
    private http: HttpClient,
    private shoppingService: ShoppingService
  ) { }

  // Generate a random product
  private generateRandomProduct(shop: Shop, productId: number): Product {
    const category = this.foodCategories[Math.floor(Math.random() * this.foodCategories.length)];
    const productsInCategory = this.allProducts[category];
    const productName = productsInCategory[Math.floor(Math.random() * productsInCategory.length)];
    const brand = this.brands[Math.floor(Math.random() * this.brands.length)];
    const weight = this.weights[Math.floor(Math.random() * this.weights.length)];
    const price = parseFloat((Math.random() * 50 + 1).toFixed(2)); // Random price between 1 and 51 PLN

    return {
      productId: productId,
      productName: productName,
      brand: brand,
      weight: weight,
      price: price,
      imageUrl: '', // No image for simulated products
      name: `${brand} ${productName}`,
      store: shop.name,
      city: shop.city,
      products: [],
      image: ''
    };
  }

  // Generate 200 products and distribute them among existing shops
  generateProducts(): Observable<Product[]> {
    return this.shoppingService.getShops().pipe(
      switchMap(shops => {
        if (shops.length === 0) {
          console.error('No shops found to associate products with');
          return of([]);
        }

        const products: Product[] = [];
        const productsPerShop = Math.ceil(200 / shops.length);
        let productId = 1;

        // Distribute products among shops
        shops.forEach(shop => {
          for (let i = 0; i < productsPerShop && products.length < 200; i++) {
            products.push(this.generateRandomProduct(shop, productId++));
          }
        });

        // Save products to the database
        return this.saveProducts(products);
      }),
      catchError(error => {
        console.error('Error generating products:', error);
        return of([]);
      })
    );
  }

  // Save products to the database
  private saveProducts(products: Product[]): Observable<Product[]> {
    // Create an array of observables for each product save operation
    const saveOperations = products.map(product => 
      this.http.post<Product>(`${this.apiUrl}/api/products`, product).pipe(
        catchError(error => {
          console.error(`Error saving product ${product.name}:`, error);
          return of(null);
        })
      )
    );

    // Execute all save operations and return the results
    return forkJoin(saveOperations).pipe(
      map(results => results.filter(result => result !== null) as Product[])
    );
  }
}
