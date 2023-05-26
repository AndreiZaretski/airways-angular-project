import { Component, OnInit } from '@angular/core';
import {
  SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-entry-with-social',
  templateUrl: './entry-with-social.component.html',
  styleUrls: ['./entry-with-social.component.scss'],
})
export class EntryWithSocialComponent implements OnInit {
  user: SocialUser;

  constructor(private authServiceSocial: SocialAuthService) { }

  ngOnInit() {
    this.authServiceSocial.authState.subscribe((user) => {
      this.user = user;
      // здесь вы можете получить пользовательские данные, такие как имя, email, фото URL и токен
      console.log(this.user);
    });
  }

  signInWithGoogle(): void {
    this.authServiceSocial.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook(): void {
    this.authServiceSocial.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
