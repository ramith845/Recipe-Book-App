import { Injectable } from '@angular/core';
import { take, exhaustMap, map } from 'rxjs/operators';
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }

        const modReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modReq);
      })
    );
  }
}
