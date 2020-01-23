import { Component } from '@angular/core';
import { AccountFacade } from 'src/app/features/account/services/account.facade';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public constructor(private accountFacade: AccountFacade) { }

  public login(): void {
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    this.accountFacade.login(email, password);
  }
}
