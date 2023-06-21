import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    CartComponent,
    CartPageComponent,
    UserPageComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
  ],
  exports: [],
})
export class CartModule {}
