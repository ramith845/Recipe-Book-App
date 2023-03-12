import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService, AuthResponse } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import * as fromApp from '../store/app.reducer'
import * as AuthActions from './store/auth.actions'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let observable: Observable<AuthResponse>;
    // line 67 had a Subscription thats no longer used so observer is useless

    // const observer = {
    //   next: (response) => {
    //     console.log(response);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   error: (errormsg) => {
    //     console.log(errormsg);
    //     // this.error = errormsg;
    //     this.showErrorAlert(errormsg);
    //     this.isLoading = false;
    //   },
    // };
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    
    if (this.isLoginMode) {
      // observable = this.authService.signin(email, password);
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}))
    } else {
      observable = this.authService.signup(email, password);
    }

    // observable.subscribe(observer);

    form.reset();
  }

  private showErrorAlert(message: string) {
    const hostVcRef = this.alertHost.viewContainerRef;
    hostVcRef.clear();

    const compRef = hostVcRef.createComponent(AlertComponent);
    // compRef.instance.message = message;
    compRef.setInput('message', message);
    this.closeSub = compRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostVcRef.clear();
    });
  }

  // resetError() {
  //   this.error = null;
  // }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
