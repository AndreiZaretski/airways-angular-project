import {
  Component, OnDestroy, OnInit,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  selectedTab = 0;

  constructor(private dialogRef: MatDialogRef<ModalComponent>) { }

  ngOnDestroy(): void {
    this.setOverflowToVisible();
  }

  ngOnInit(): void {
    this.setOverflowToAuto();
  }

  private setOverflowToVisible() {
    const overlayContainer = document.querySelector('.cdk-overlay-container');

    if (overlayContainer instanceof HTMLElement) {
      overlayContainer.style.overflow = 'visible';
      overlayContainer.style.pointerEvents = 'none';
      // overlayContainer.style.position = 'fixed';
    }
  }

  private setOverflowToAuto() {
    const overlayContainer = document.querySelector('.cdk-overlay-container');
    if (overlayContainer instanceof HTMLElement) {
      overlayContainer.style.overflow = 'auto';
      overlayContainer.style.pointerEvents = 'auto';
      // overlayContainer.style.position = 'static';
    }
  }
}
