import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditPanelService {
  editPanelShown = false;

  openEditPanel(): void {
    this.editPanelShown = !this.editPanelShown;
  }
}
