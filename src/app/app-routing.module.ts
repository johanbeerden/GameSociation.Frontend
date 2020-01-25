import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';


const routes: Routes = [
    {path: 'account', loadChildren: () => import('./features/account/account.module').then(mod => mod.AccountModule)},
    {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(mod => mod.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'associations',
        loadChildren: () => import('./features/associations/associations.module').then(mod => mod.AssociationsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'invitations',
        loadChildren: () => import('./features/invitations/invitations.module').then(mod => mod.InvitationsModule),
        canActivate: [AuthGuard]
    },
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
