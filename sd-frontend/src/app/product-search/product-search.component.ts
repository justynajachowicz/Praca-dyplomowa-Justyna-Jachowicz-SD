import {Component} from "@angular/core";
import {Product} from "../models/models";
import {ProductService} from "../product.service";
import {CurrencyPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-product-search',
    templateUrl: './product-search.component.html',
    imports: [
        CurrencyPipe,
        FormsModule
    ],
    styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent {
    searchQuery: string = '';
    products: Product[] = [];

    constructor(private productService: ProductService) {}

    search() {
        if (this.searchQuery.trim()) {
            this.productService.searchProduct(this.searchQuery).subscribe((data) => {
                this.products = data;
            });
        }
    }
}