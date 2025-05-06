import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotional-flyers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotional-flyers.component.html',
  styleUrls: ['./promotional-flyers.component.css']
})
export class PromotionalFlyersComponent implements OnInit {
  // Store types
  storeTypes = ['biedronka', 'lidl', 'kaufland'];
  currentStore: string = 'biedronka';

  // Biedronka flyers
  biedronkaFlyers: string[] = [
    'assets/images/gazetka1.png',
    'assets/images/gazetka2.png',
    'assets/images/gazetka3.png',
    'assets/images/gazetka4.png',
    'assets/images/gazetka5.png'
  ];

  // Lidl flyers
  lidlFlyers: string[] = [
    'assets/images/lidl1.png',
    'assets/images/lidl2.png',
    'assets/images/lidl3.png',
    'assets/images/lidl4.png',
    'assets/images/lidl5.png', // Corrected from lid15.png to lidl5.png
    'assets/images/lidl6.png',
    'assets/images/lidl7.png', // Corrected from lid17.png to lidl7.png
    'assets/images/lidl8.png'  // Corrected from lid18.png to lidl8.png
  ];

  // Kaufland flyers
  kauflandFlyers: string[] = [
    'assets/images/k1.png',
    'assets/images/k2.png',
    'assets/images/k3.png',
    'assets/images/k4.png',
    'assets/images/k5.png'
  ];

  currentFlyerIndex: number = 0;
  imageError: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['/add-purchase']);
  }

  // Get the current flyers array based on selected store
  get flyers(): string[] {
    if (this.currentStore === 'biedronka') {
      return this.biedronkaFlyers;
    } else if (this.currentStore === 'lidl') {
      return this.lidlFlyers;
    } else if (this.currentStore === 'kaufland') {
      return this.kauflandFlyers;
    }
    return this.biedronkaFlyers; // Default to Biedronka
  }

  // Switch between stores
  switchStore(store: string): void {
    if (this.storeTypes.includes(store) && store !== this.currentStore) {
      this.currentStore = store;
      this.currentFlyerIndex = 0;
      this.imageError = false;
    }
  }

  // Get store name for display
  getStoreName(): string {
    if (this.currentStore === 'biedronka') {
      return 'Biedronki';
    } else if (this.currentStore === 'lidl') {
      return 'Lidla';
    } else if (this.currentStore === 'kaufland') {
      return 'Kauflandu';
    }
    return 'Biedronki'; // Default to Biedronka
  }

  nextFlyer(): void {
    if (this.currentFlyerIndex < this.flyers.length - 1) {
      this.currentFlyerIndex++;
      this.imageError = false; // Reset error flag when navigating
    }
  }

  previousFlyer(): void {
    if (this.currentFlyerIndex > 0) {
      this.currentFlyerIndex--;
      this.imageError = false; // Reset error flag when navigating
    }
  }

  getCurrentFlyer(): string {
    const flyer = this.flyers[this.currentFlyerIndex];
    console.log(`Loading flyer at index ${this.currentFlyerIndex}: ${flyer}`);
    return flyer;
  }

  isFirstFlyer(): boolean {
    return this.currentFlyerIndex === 0;
  }

  isLastFlyer(): boolean {
    return this.currentFlyerIndex === this.flyers.length - 1;
  }

  handleImageError(event: any): void {
    this.imageError = true;
    console.error('Error loading image:', event);

    // Log more detailed information about the error
    const currentFlyer = this.flyers[this.currentFlyerIndex];
    console.error(`Failed to load flyer at index ${this.currentFlyerIndex}: ${currentFlyer}`);
    console.error(`Current store: ${this.currentStore}, Total flyers: ${this.flyers.length}`);

    // Check if the file exists by trying to fetch it
    fetch(currentFlyer)
      .then(response => {
        if (!response.ok) {
          console.error(`File not found: ${currentFlyer}, Status: ${response.status}`);
        } else {
          console.log(`File exists: ${currentFlyer}`);
        }
      })
      .catch(error => {
        console.error(`Error checking file: ${currentFlyer}`, error);
      });
  }
}
