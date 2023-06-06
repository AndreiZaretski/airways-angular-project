import {
  Component, OnDestroy, OnInit,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  selectedTab = 0;

  // private backdropClickSub: Subscription;

  // private afterOpenedSub: Subscription;

  // private afterClosedSub: Subscription;

  constructor(private dialogRef: MatDialogRef<ModalComponent>) { }
  // private cd: ChangeDetectorRef  )

  ngOnDestroy(): void {
    // setTimeout(() => {
    // this.backdropClickSub?.unsubscribe();
    // this.afterOpenedSub?.unsubscribe();
    // this.afterClosedSub?.unsubscribe();
    // });
    this.setOverflowToVisible();
    // this.cd.detectChanges();
    // console.log('component destroy');
  }

  ngOnInit(): void {
    // this.backdropClickSub = this.dialogRef.backdropClick().subscribe(() => {
    //   this.setPointerEventsToNone();
    // });
    this.setOverflowToAuto();

    // this.afterOpenedSub = this.dialogRef.afterOpened().subscribe(() => {
    //   this.setOverflowToAuto();
    // });

    // this.afterClosedSub = this.dialogRef.afterClosed().subscribe(() => {
    //   this.setPointerEventsToNone();
    // });
  }

  private setOverflowToVisible() {
    const overlayContainer = document.querySelector('.cdk-overlay-container');

    if (overlayContainer instanceof HTMLElement) {
      // overlayContainer.style.pointerEvents = 'none';
      overlayContainer.style.position = 'absolute';
      overlayContainer.style.overflow = 'visible';
    }
  }

  private setOverflowToAuto() {
    const overlayContainer = document.querySelector('.cdk-overlay-container');
    if (overlayContainer instanceof HTMLElement) {
      // overlayContainer.style.pointerEvents = 'auto';
      overlayContainer.style.position = 'fixed';
      overlayContainer.style.overflow = 'auto';
    }
  }
}
