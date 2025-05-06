import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PurchaseHistoryService } from '../services/purchase-history.service';
import { PurchaseHistory } from '../models/purchase-history.model';

@Component({
  selector: 'app-purchase-history',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  purchaseHistory: PurchaseHistory[] = [];
  filteredHistory: PurchaseHistory[] = [];
  userEmail: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  // Filter variables
  searchTerm: string = '';
  selectedStore: string = '';
  startDate: string = '';
  endDate: string = '';

  // Stores for filtering
  availableStores: string[] = [];

  constructor(private purchaseHistoryService: PurchaseHistoryService) { }

  ngOnInit(): void {
    // Get user email from localStorage
    const email = localStorage.getItem('userEmail');
    console.log('PurchaseHistoryComponent - ngOnInit - userEmail from localStorage:', email);

    if (email) {
      this.userEmail = email;
      this.loadPurchaseHistory();
    } else {
      console.error('PurchaseHistoryComponent - ngOnInit - userEmail not found in localStorage');
      this.errorMessage = 'Nie znaleziono adresu email użytkownika. Zaloguj się ponownie.';
    }
  }

  loadPurchaseHistory(): void {
    console.log('PurchaseHistoryComponent - loadPurchaseHistory - userEmail:', this.userEmail);

    if (!this.userEmail) {
      this.errorMessage = 'Wprowadź swój email, aby zobaczyć historię zakupów';
      console.error('PurchaseHistoryComponent - loadPurchaseHistory - userEmail is empty');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    console.log('PurchaseHistoryComponent - loadPurchaseHistory - calling getPurchaseHistory with email:', this.userEmail);

    this.purchaseHistoryService.getPurchaseHistory(this.userEmail).subscribe({
      next: (data) => {
        console.log('PurchaseHistoryComponent - loadPurchaseHistory - received data:', data);
        this.purchaseHistory = data;
        this.filteredHistory = [...this.purchaseHistory];
        this.extractAvailableStores();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('PurchaseHistoryComponent - Error loading purchase history:', err);
        this.errorMessage = 'Nie udało się załadować historii zakupów. Spróbuj ponownie.';
        this.isLoading = false;
      }
    });
  }

  // Extract unique stores from purchase history for filtering
  extractAvailableStores(): void {
    const storeSet = new Set<string>();
    this.purchaseHistory.forEach(item => {
      if (item.store) {
        storeSet.add(item.store);
      }
    });
    this.availableStores = Array.from(storeSet);
  }

  // Apply filters to purchase history
  applyFilters(): void {
    this.filteredHistory = this.purchaseHistory.filter(item => {
      // Filter by search term
      const matchesSearch = !this.searchTerm || 
        item.productName.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filter by store
      const matchesStore = !this.selectedStore || 
        item.store === this.selectedStore;

      // Filter by date range
      let matchesDateRange = true;
      if (this.startDate && this.endDate) {
        const itemDate = new Date(item.purchaseDate);
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        matchesDateRange = itemDate >= start && itemDate <= end;
      }

      return matchesSearch && matchesStore && matchesDateRange;
    });
  }

  // Reset all filters
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedStore = '';
    this.startDate = '';
    this.endDate = '';
    this.filteredHistory = [...this.purchaseHistory];
  }

  // Delete a purchase history item
  deletePurchaseHistoryItem(id: number | undefined): void {
    if (!id) {
      this.errorMessage = 'Cannot delete item: ID is missing';
      return;
    }

    if (confirm('Are you sure you want to delete this purchase history item?')) {
      this.isLoading = true;
      this.purchaseHistoryService.deletePurchaseHistory(id).subscribe({
        next: () => {
          this.successMessage = 'Purchase history item deleted successfully';
          this.purchaseHistory = this.purchaseHistory.filter(item => item.id !== id);
          this.filteredHistory = this.filteredHistory.filter(item => item.id !== id);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error deleting purchase history item:', err);
          this.errorMessage = 'Failed to delete purchase history item. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  // Complete current purchase
  completePurchase(): void {
    if (!this.userEmail) {
      this.errorMessage = 'Please enter your email to complete purchase';
      return;
    }

    if (confirm('Are you sure you want to complete your current purchase? This will move all items from your shopping list to purchase history.')) {
      this.isLoading = true;
      this.purchaseHistoryService.completePurchase(this.userEmail).subscribe({
        next: (response) => {
          this.successMessage = response;
          this.loadPurchaseHistory(); // Reload purchase history
        },
        error: (err) => {
          console.error('Error completing purchase:', err);
          this.errorMessage = 'Failed to complete purchase. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }
}
