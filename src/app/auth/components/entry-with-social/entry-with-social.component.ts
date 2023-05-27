// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Component, DoCheck, OnInit,
} from '@angular/core';
import {
  SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser,
  // GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-entry-with-social',
  templateUrl: './entry-with-social.component.html',
  styleUrls: ['./entry-with-social.component.scss'],
})

export class EntryWithSocialComponent implements OnInit, DoCheck {
  user: SocialUser;

  constructor(private authServiceSocial: SocialAuthService) {
  }

  ngOnInit() {
    this.authServiceSocial.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }

  ngDoCheck() {
  }

  signInWithGoogle(): void {
    this.authServiceSocial.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook(): void {
    this.authServiceSocial.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
