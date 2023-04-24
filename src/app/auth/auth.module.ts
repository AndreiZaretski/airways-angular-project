import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './pages/modal/modal.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
// import { CloseModalService } from './services/close-modal.service';
// import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    ModalComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  // providers: [CloseModalService],
  exports: [ModalComponent,
    // AuthRoutingModule
  ],
})
export class AuthModule { }
