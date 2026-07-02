import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-dialog',
  imports: [MatDialogModule],
  templateUrl: './form-dialog.html',
  styleUrl: './form-dialog.css',
})
export class FormDialog {
  private dialogRef = inject(MatDialogRef);

  close() {
    this.dialogRef.close(true);
  }
  continue() {
    this.dialogRef.close(false);
  }
}
