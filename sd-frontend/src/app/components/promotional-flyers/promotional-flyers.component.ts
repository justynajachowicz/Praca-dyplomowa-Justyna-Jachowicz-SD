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
  flyers: string[] = [
    'assets/images/gazetka1.png',
    'assets/images/gazetka2.png',
    'assets/images/gazetka3.png',
    'assets/images/gazetka4.png',
    'assets/images/gazetka5.png'
  ];

  currentFlyerIndex: number = 0;
  imageError: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['/add-purchase']);
  }

  nextFlyer(): void {
    if (this.currentFlyerIndex < this.flyers.length - 1) {
      this.currentFlyerIndex++;
    }
  }

  previousFlyer(): void {
    if (this.currentFlyerIndex > 0) {
      this.currentFlyerIndex--;
    }
  }

  getCurrentFlyer(): string {
    return this.flyers[this.currentFlyerIndex];
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
  }
}
