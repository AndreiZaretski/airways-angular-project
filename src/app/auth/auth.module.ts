import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './pages/modal/modal.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EntryWithSocialComponent } from './components/entry-with-social/entry-with-social.component';

@NgModule({
  declarations: [
    ModalComponent,
    LoginComponent,
    SignupComponent,
    EntryWithSocialComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [ModalComponent,
  ],
})
export class AuthModule { }
