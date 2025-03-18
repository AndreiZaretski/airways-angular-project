import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ModalComponent } from './pages/modal/modal.component';

const routes: Routes = [
  // { path: '', component: ModalComponent, canActivate: [] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
