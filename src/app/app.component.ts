import { Component } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
import { Store, Select } from '@ngxs/store';
import { Router } from '@angular/router';
import { Logout } from './core/store/app.action';
import { Observable } from 'rxjs';
import { AppState } from './core/store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  @Select(AppState.tag) public tag$: Observable<string>;

  public verticalNavigationCollapsed = true;

  public constructor(private authenticationService: AuthenticationService, private store: Store, private router: Router) { }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public logout(): void {
    this.authenticationService.logout();
    this.store.dispatch(new Logout());
    this.router.navigate(['/account']);
  }
}
