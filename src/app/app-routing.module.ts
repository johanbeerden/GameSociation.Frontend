import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  { path: 'account', loadChildren: () => import('./features/account/account.module').then(mod => mod.AccountModule) },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(mod => mod.DashboardModule), canActivate: [AuthGuard] },
  { path: 'owned-associations', loadChildren: () => import('./features/owned-associations/owned-associations.module').then(mod => mod.OwnedAssociationsModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
