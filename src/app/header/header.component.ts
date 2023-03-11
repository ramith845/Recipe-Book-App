import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer'
import { mapTo } from 'rxjs-compat/operator/mapTo';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output('navTo') tab = new EventEmitter<string>();
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dsService: DataStorageService,
    private authService: AuthService, private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
        this.isAuthenticated = !!user;
    });
  }

  tabsNav(section: string) {
    // this.tab.emit(section);
  }

  onSaveData() {
    this.dsService.storeRecipes();
  }

  onFetchData() {
    this.dsService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.signout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
