import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditPanelService {
  editPanelShown = false;

  openEditPanel(): void {
    console.log('1', this.editPanelShown);
    this.editPanelShown = !this.editPanelShown;
    console.log('2', this.editPanelShown);
  }
}
