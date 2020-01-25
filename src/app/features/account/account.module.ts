import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountRoutingModule} from './account-routing.module';
import {AccountFacade} from './services/account.facade';
import {LoginComponent} from './containers/login/login.component';
import {RegisterComponent} from './containers/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClarityModule} from '@clr/angular';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  providers: [
    AccountFacade
  ]
})
export class AccountModule { }
