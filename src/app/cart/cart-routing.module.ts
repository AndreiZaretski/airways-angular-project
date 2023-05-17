import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [{ path: '', component: CartPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
