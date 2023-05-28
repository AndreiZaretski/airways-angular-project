import { Injectable } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  constructor() { }

  private stepper: MatStepper;

  private hasNext(): boolean {
    return this.stepper.selectedIndex < this.stepper.steps.length - 1;
  }

  private hasPrevious(): boolean {
    return this.stepper.selectedIndex > 0;
  }

  nextStep(): void {
    if (this.hasNext()) {
      if (this.stepper.selected) {
        this.stepper.selected.completed = true;
        this.stepper.next();
        this.stepper.selected.editable = true;
      }
    }
  }

  previousStep(): void {
    if (this.hasPrevious()) {
      if (this.stepper.selected) {
        this.stepper.selected.editable = true;
        this.stepper.selected.completed = false;
        this.stepper.previous();
        this.stepper.selected.completed = false;
      }
    }
  }

  firstStep() {
    this.stepper.selectedIndex = 0;
  }

  lastStep() {
    // eslint-disable-next-line no-param-reassign
    this.stepper.steps.forEach((step) => step.completed = true);
    this.stepper.selectedIndex = this.stepper.steps.length - 1;
  }

  goToSecondStep() {
    if (this.stepper) {
      const step1 = this.stepper.steps.get(0);
      const step2 = this.stepper.steps.get(1);
      if (step1 && step2) {
        step1.completed = true;
        step1.editable = false;
        step2.editable = true;
        this.stepper.selectedIndex = 1;
        console.log(step1.completed, step1.editable, step2.editable);
      }
    }
  }

  init(stepper: MatStepper) {
    this.stepper = stepper;
  }

  resetStepper() {
    this.stepper.reset();
  }
}
