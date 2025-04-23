import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSimulationService } from '../services/product-simulation.service';
import { Product } from '../models/models';

@Component({
  selector: 'app-product-simulation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-simulation.component.html',
  styleUrls: ['./product-simulation.component.css']
})
export class ProductSimulationComponent {
  isGenerating = false;
  generationComplete = false;
  generatedProducts: Product[] = [];
  error: string | null = null;

  constructor(private productSimulationService: ProductSimulationService) {}

  generateProducts(): void {
    this.isGenerating = true;
    this.generationComplete = false;
    this.error = null;

    this.productSimulationService.generateProducts().subscribe({
      next: (products) => {
        this.generatedProducts = products;
        this.generationComplete = true;
        this.isGenerating = false;
        console.log(`Successfully generated ${products.length} products`);
      },
      error: (err) => {
        this.error = 'Wystąpił błąd podczas generowania produktów. Spróbuj ponownie.';
        this.isGenerating = false;
        console.error('Error generating products:', err);
      }
    });
  }

  // Count unique stores in the generated products
  countUniqueStores(): number {
    if (!this.generatedProducts.length) return 0;

    const uniqueStores = new Set<string>();
    this.generatedProducts.forEach(product => {
      if (product.store) {
        uniqueStores.add(product.store);
      }
    });

    return uniqueStores.size;
  }

  // Get a sample of up to 6 products to display
  getSampleProducts(): Product[] {
    if (!this.generatedProducts.length) return [];

    // Return up to 6 products for preview
    return this.generatedProducts.slice(0, 6);
  }
}
