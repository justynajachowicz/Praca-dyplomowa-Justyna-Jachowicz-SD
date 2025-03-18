import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-admin-user-management',
    templateUrl: './admin-user-management.component.html',
    styleUrls: ['./admin-user-management.component.css'],
    standalone: false
})
export class AdminUserManagementComponent implements OnInit {
    users: any[] = [];

    constructor(private userService: UserService, private dialog: MatDialog) {
    }

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

    openDeleteDialog(userId: number, email: string): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {userId, email}
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                this.userService.deleteUser(userId).subscribe(() => {
                    this.getUsers();
                });
            }
        });
    }

    updateRole(userId: number, newRole: string): void {
        this.userService.updateUserRole(userId, newRole).subscribe(() => {
            this.getUsers();
        });
    }
}
