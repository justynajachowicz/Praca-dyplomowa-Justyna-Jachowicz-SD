import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatIcon
    ],
    styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { userId: number, email: string }
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }
}