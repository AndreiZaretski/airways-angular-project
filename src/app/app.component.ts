import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/services/auth.service';
import { checkRequestUser } from './redux/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'airways-angular-project';

  constructor(
    public authService: AuthService,
    private store: Store,
  ) { }

  ngOnInit() {
    this.store
      .dispatch(checkRequestUser());
  }
}
