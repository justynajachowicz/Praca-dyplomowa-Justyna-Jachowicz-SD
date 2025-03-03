import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          console.error('Błąd podczas pobierania użytkowników', error);
        }
    );
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.getUsers(); // Odświeżenie listy po usunięciu
    });
  }

  updateRole(userId: number, newRole: string): void {
    this.userService.updateUserRole(userId, newRole).subscribe(() => {
      this.getUsers(); // Odświeżenie listy po zmianie roli
    });
  }
}
