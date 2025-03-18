import { Component } from '@angular/core';
import { ReceiptService } from '../../services/receipt.service';
import {NgIf} from "@angular/common";
import { Location } from '@angular/common';

@Component({
  selector: 'app-receipt-upload',
  templateUrl: './receipt-upload.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  providers: [ReceiptService],
  styleUrls: ['./receipt-upload.component.css']
})
export class ReceiptUploadComponent {
  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;



  constructor(private receiptService: ReceiptService, private location: Location) {}

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }
  goBack() {
    this.location.back(); // Powrót do poprzedniej strony
  }

  uploadReceipt() {
    if (!this.selectedFile) return;

    this.receiptService.uploadReceipt(this.selectedFile).subscribe({
      next: () => {
        this.uploadSuccess = true;
        this.uploadError = false;
      },
      error: () => {
        this.uploadError = true;
        this.uploadSuccess = false;
      }
    });
  }
}
