import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { ShoppingListService } from '../services/shopping.service';
import { ShoppingListItem } from '../models/shopping-list-item';
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule], // Dodaj to!
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList: ShoppingListItem[] = [];
  userEmail: string = '';

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.userEmail = email;
      this.loadShoppingList();
    }
  }

  loadShoppingList(): void {
    this.shoppingListService.getShoppingList(this.userEmail).subscribe({
      next: (data: ShoppingListItem[]) => {
        console.log('Dane z backendu:', data);  // Sprawdź, czy dane są poprawne
        this.shoppingList = data;
      },
      error: (err: any) => console.error('Błąd podczas pobierania listy zakupów:', err)
    });
  }

  }