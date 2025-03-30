import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common'; // 👈 DODAJ TO!

@Component({
    selector: 'app-home',
    imports: [SlickCarouselModule, FormsModule, CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    constructor(private router: Router) {}

    slides = [
        { img: "assets/images/obrazek1.png" },
        { img: "assets/images/obrazek2.png" },
        { img: "assets/images/obrazek3.png" },
        { img: "assets/images/obrazek4.png" }
    ];

    slideConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: true,
        infinite: true,
        centerMode: false,
        variableWidth: false,
        adaptiveHeight: false
    };

    cities = ['Nowy Sącz', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań'];
    selectedCity = this.cities[0];

    goToAddPurchase() {
        console.log(`Planowanie zakupów dla miasta: ${this.selectedCity}`);
        this.router.navigate(['/add-purchase']);
    }
}
