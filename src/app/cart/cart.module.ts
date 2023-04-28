import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CartComponent, CartPageComponent],
  imports: [CommonModule, CartRoutingModule, SharedModule],
  exports: [],
})
export class CartModule {}
