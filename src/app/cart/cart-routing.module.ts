import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { Path } from '../shared/enums/router.enum';

const routes: Routes = [
  {
    path: '',
    component: CartPageComponent,
  },
  {
    path: Path.FlightsHistory,
    component: UserPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
