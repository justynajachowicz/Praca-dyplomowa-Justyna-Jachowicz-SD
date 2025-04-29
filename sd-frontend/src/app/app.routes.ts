import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import {ReceiptUploadComponent} from "./components/receipt-upload/receipt-upload.component";
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';
import {ProductSearchComponent} from "./product-search/product-search.component";
import { ProductSimulationComponent } from './product-simulation/product-simulation.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AdminGuard } from './guards/admin.guard';




export const routes: Routes = [
  { path: '', component: HomeComponent }, // Strona główna
  { path: 'product-search', component: ProductSearchComponent },
  { path: 'login', component: LoginComponent }, // Ekran logowania
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent }, // Panel użytkownika];
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'admin/users', component: AdminUserManagementComponent, canActivate: [AdminGuard] },
  { path: 'receipt-upload', component: ReceiptUploadComponent },
  { path: 'add-purchase', component: PurchaseFormComponent },  // Formularz dodania zakupu
  { path: 'product-simulation', component: ProductSimulationComponent, canActivate: [AdminGuard] }, // Symulacja produktów (tylko dla admina)
  { path: '**', redirectTo: '' },

  // Inne ścieżki...
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
