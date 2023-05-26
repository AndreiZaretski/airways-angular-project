import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
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
    SocialLoginModule,
  ],
  exports: [ModalComponent,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '240861790827-cp4s9qvmh3j908quhegqap4m58jf0cbb.apps.googleusercontent.com',
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '1650024955469825',
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
})
export class AuthModule { }
