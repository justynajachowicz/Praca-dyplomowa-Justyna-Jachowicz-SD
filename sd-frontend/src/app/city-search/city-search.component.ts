import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common'; // Importuj CommonModule
import { FormsModule } from '@angular/forms'; // Importuj FormsModule

@Component({
    selector: 'app-city-search',
    templateUrl: './city-search.component.html',
    imports: [
        FormsModule, // Jeśli używasz [(ngModel)], FormsModule musi być zaimportowane
        CommonModule // Zaimportuj CommonModule, żeby mieć wsparcie dla *ngIf, *ngFor
    ],
    styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
    cities: string[] = [];  // Tablica do przechowywania wyników wyszukiwania
    query: string = '';  // Zmienna do przechowywania wpisanej nazwy miasta
    errorMessage: string = '';  // Zmienna do przechowywania błędów

    constructor(private userService: UserService) {}

    // Wywołanie metody z serwisu w celu wyszukiwania miast
    searchCities(): void {
        if (this.query.trim()) {  // Sprawdzenie, czy zapytanie nie jest puste
            this.userService.searchCities(this.query).subscribe(
                (data: string[]) => {
                    this.cities = data;  // Zapisanie wyników wyszukiwania
                    this.errorMessage = '';  // Resetowanie komunikatu o błędzie
                },
                (error) => {
                    this.errorMessage = 'Nie udało się znaleźć miast. Spróbuj ponownie.';  // Obsługa błędów
                }
            );
        } else {
            this.errorMessage = 'Proszę podać nazwę miasta!';
        }
    }

    ngOnInit(): void {}
}