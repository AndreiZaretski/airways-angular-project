import {
  AfterViewInit,
  Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild,
} from '@angular/core';
import {
  SocialAuthService, GoogleLoginProvider, FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import {
  EMPTY,
  Subscription, catchError, from, of,
} from 'rxjs';

@Component({
  selector: 'app-entry-with-social',
  templateUrl: './entry-with-social.component.html',
  styleUrls: ['./entry-with-social.component.scss'],
})

export class EntryWithSocialComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() tabChange = new EventEmitter<number>();

  @ViewChild('entrySocial') entrySocial: ElementRef;

  // @ViewChild('entrySocial', { read: ElementRef }) entrySocial: ElementRef;

  subscriptionGogle: Subscription;

  subscriptionFacebook: Subscription;

  constructor(
    private authServiceSocial: SocialAuthService,
    private renderer: Renderer2,
  ) {
  }

  ngAfterViewInit() {
    if (this.entrySocial && this.entrySocial.nativeElement) {
      this.renderer.listen(this.entrySocial.nativeElement.querySelector('asl-google-signin-button'), 'click', () => {
        this.tabChange.emit(1);
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptionGogle?.unsubscribe();
    this.subscriptionFacebook?.unsubscribe();
  }

  ngOnInit() {
  }

  signInWithGoogle(): void {
    this.subscriptionGogle = from(this.authServiceSocial
      .signIn(GoogleLoginProvider.PROVIDER_ID)).pipe(
      catchError((error) => {
        if (error.message === 'Not logged in'
      || error.message === 'User cancelled login or did not fully authorize.') {
          // console.log('Ignoring error Not logged in', error.message);
          return EMPTY;
        }
        return of(null);
      }),
    ).subscribe();
  }

  signInWithFacebook(): void {
    this.subscriptionFacebook = from(this.authServiceSocial
      .signIn(FacebookLoginProvider.PROVIDER_ID)).pipe(
      catchError((error) => {
        if (error.message === 'Not logged in'
      || error.message === 'User cancelled login or did not fully authorize.') {
          // console.log('Ignoring error Not logged in', error.message);
          return EMPTY;
        }
        return of(null);
      }),
    ).subscribe();
  }
}
