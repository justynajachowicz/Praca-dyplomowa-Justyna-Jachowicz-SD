import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',  // Element, który będzie używany w HTML
  templateUrl: './app.component.html',  // Plik HTML komponentu
  styleUrls: ['./app.component.css']  // Plik CSS komponentu
})
export class AppComponent {
  title = 'shopping-dashboard';  
}
