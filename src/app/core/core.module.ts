import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { StepperComponent } from './components/stepper/stepper.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    StepperComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true,
  }],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule { }
