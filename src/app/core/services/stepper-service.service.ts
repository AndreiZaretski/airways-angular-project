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
        this.stepper.selected.completed = true; // отметить текущий шаг как выполненный
        this.stepper.next(); // перейти к следующему шагу
        this.stepper.selected.editable = true; // сделать следующий шаг редактируемым
      }
    }
  }

  previousStep(): void {
    if (this.hasPrevious()) {
      if (this.stepper.selected) {
        this.stepper.selected.editable = true; // сделать текущий шаг редактируемым
        this.stepper.selected.completed = false;// снять отметку о выполнении с текущего шага
        this.stepper.previous(); // перейти к предыдущему шагу
        this.stepper.selected.completed = false; // снять отметку о выполнении с предыдущего шага
      }
    }
  }

  firstStep() {
    this.stepper.selectedIndex = 0;
  }

  lastStep() {
    this.stepper.selectedIndex = this.stepper.steps.length - 1;
  }

  init(stepper: MatStepper) {
    this.stepper = stepper;
  }

  resetStepper() {
    this.stepper.reset();
  }
}
