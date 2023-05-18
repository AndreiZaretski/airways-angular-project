import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { TableComponent } from './components/table/table.component';
import { Path } from '../shared/enums/router.enum';
import { RouterModule, Routes } from '@angular/router';
import { CartMainPageComponent } from './pages/cart-main-page/cart-main-page.component';

const routes: Routes = [
  {
    path: Path.Cart,
    component: CartMainPageComponent,
    children: [
      { path: Path.Empty, component: CartPageComponent },
      { path: Path.FlightsHistory, component: UserPageComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  declarations: [
    CartComponent,
    CartPageComponent,
    UserPageComponent,
    TableComponent,
    CartMainPageComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class CartModule {}
