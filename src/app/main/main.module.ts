import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import MainRoutingModule from './main-routing.module';

@NgModule({
  declarations: [
    MainPageComponent,
    SearchFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
  ],
})
export class MainModule { }
