import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-admin-user-management',
    templateUrl: './admin-user-management.component.html',
    styleUrls: ['./admin-user-management.component.css'],
    standalone: false
})
export class AdminUserManagementComponent implements OnInit {
    users: any[] = [];
    isLoading: boolean = false;
    errorMessage: string = '';

    constructor(private userService: UserService, private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        this.isLoading = true;
        this.errorMessage = '';

        this.userService.getUsers().pipe(
            finalize(() => this.isLoading = false)
        ).subscribe(
            (data) => {
                this.users = data;
            },
            (error) => {
                console.error('Błąd podczas pobierania użytkowników', error);
                this.errorMessage = 'Nie udało się pobrać listy użytkowników. Spróbuj ponownie później.';
            }
        );
    }

    openDeleteDialog(userId: number, email: string): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                title: 'Potwierdź usunięcie',
                message: `Czy na pewno chcesz usunąć użytkownika ${email}?`,
                userId, 
                email
            }
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                this.deleteUser(userId);
            }
        });
    }

    deleteUser(userId: number): void {
        this.isLoading = true;
        this.errorMessage = '';

        this.userService.deleteUser(userId).pipe(
            finalize(() => this.isLoading = false)
        ).subscribe(
            () => {
                this.getUsers();
            },
            (error) => {
                console.error('Błąd podczas usuwania użytkownika', error);
                this.errorMessage = 'Nie udało się usunąć użytkownika. Spróbuj ponownie później.';
            }
        );
    }

    updateRole(userId: number, newRole: string): void {
        this.isLoading = true;
        this.errorMessage = '';

        this.userService.updateUserRole(userId, newRole).pipe(
            finalize(() => this.isLoading = false)
        ).subscribe(
            () => {
                this.getUsers();
            },
            (error) => {
                console.error('Błąd podczas aktualizacji roli użytkownika', error);
                this.errorMessage = 'Nie udało się zaktualizować roli użytkownika. Spróbuj ponownie później.';
            }
        );
    }
}
