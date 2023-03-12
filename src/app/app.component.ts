import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from './auth/auth.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    // Dispatching autologin on reload or refresh which checks for user data in local storage
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
