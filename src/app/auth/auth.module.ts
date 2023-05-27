// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';
import { EMPTY } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
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
    BrowserModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  exports: [ModalComponent,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        ux_mode: 'popup',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '240861790827-cp4s9qvmh3j908quhegqap4m58jf0cbb.apps.googleusercontent.com',

            ),
            ux_mode: 'popup',
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '1650024955469825',
              {
                scope: 'public_profile',
              },
            ),

          },
        ],
        onError: (err) => {
          console.error(err);
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          EMPTY;
        },
      } as SocialAuthServiceConfig,
    },
  ],
})
export class AuthModule { }
