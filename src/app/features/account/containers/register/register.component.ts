import { Component } from '@angular/core';
import { AccountFacade } from '../../services/account.facade';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  public form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required)
  });

  public constructor(private accountFacade: AccountFacade) { }

  public register(): void {
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    const username = this.form.get('username').value;
    this.accountFacade.register(email, password, username);
  }
}
