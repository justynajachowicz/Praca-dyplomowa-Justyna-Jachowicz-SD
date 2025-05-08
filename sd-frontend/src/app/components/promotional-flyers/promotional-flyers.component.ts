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
  storeTypes = ['biedronka', 'lidl', 'kaufland', 'auchan'];
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

  // Auchan flyers
  auchanFlyers: string[] = [
    'assets/images/a1.png',
    'assets/images/a2.png',
    'assets/images/a3.png',
    'assets/images/a4.png',
    'assets/images/a5.png',
    'assets/images/a6.png',
    'assets/images/a7.png',
    'assets/images/a8.png',
    'assets/images/a9.png',
    'assets/images/a10.png',
    'assets/images/a11.png',
    'assets/images/a12.png',
    'assets/images/a13.png'
  ];

  currentFlyerIndex: number = 0;
  imageError: boolean = false;
  pageFlipped: boolean = false;

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
    } else if (this.currentStore === 'auchan') {
      return this.auchanFlyers;
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
    } else if (this.currentStore === 'auchan') {
      return 'Auchan';
    }
    return 'Biedronki'; // Default to Biedronka
  }

  flipPageForward(): void {
    if (this.currentFlyerIndex < this.flyers.length - 1) {
      this.pageFlipped = true;

      // Wait for the animation to complete before changing the flyer
      setTimeout(() => {
        this.currentFlyerIndex++;
        this.imageError = false; // Reset error flag when navigating

        // Reset the page flip state after changing the flyer
        setTimeout(() => {
          this.pageFlipped = false;
        }, 50);
      }, 400);
    }
  }

  flipPageBackward(): void {
    if (this.currentFlyerIndex > 0) {
      this.pageFlipped = true;

      // Wait for the animation to complete before changing the flyer
      setTimeout(() => {
        this.currentFlyerIndex--;
        this.imageError = false; // Reset error flag when navigating

        // Reset the page flip state after changing the flyer
        setTimeout(() => {
          this.pageFlipped = false;
        }, 50);
      }, 400);
    }
  }

  // For backward compatibility
  nextFlyer(): void {
    this.flipPageForward();
  }

  previousFlyer(): void {
    this.flipPageBackward();
  }

  // Get the previous flyer (for displaying on the left page)
  getPreviousFlyer(): string {
    if (this.currentFlyerIndex > 0) {
      return this.flyers[this.currentFlyerIndex - 1];
    }
    return '';
  }

  // Get the next flyer (for displaying on the right page back)
  getNextFlyer(): string {
    if (this.currentFlyerIndex < this.flyers.length - 1) {
      return this.flyers[this.currentFlyerIndex + 1];
    }
    return '';
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
