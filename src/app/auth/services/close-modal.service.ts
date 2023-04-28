import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../pages/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class CloseModalService {
  constructor(private dialogRef: MatDialogRef<ModalComponent>) { }

  closeModal() {
    this.dialogRef.close();
  }
}
