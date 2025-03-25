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




export const routes: Routes = [
  { path: '', component: HomeComponent }, // Strona główna
  { path: 'login', component: LoginComponent }, // Ekran logowania
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent }, // Panel użytkownika];
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'admin/users', component: AdminUserManagementComponent },
  { path: 'receipt-upload', component: ReceiptUploadComponent },
  { path: 'add-purchase', component: PurchaseFormComponent },  // Formularz dodania zakupu
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
