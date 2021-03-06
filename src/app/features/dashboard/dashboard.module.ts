import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardFacade} from './services/dashboard.facade';
import {DashboardComponent} from './containers/dashboard/dashboard.component';
import {OwnedAssociationsCardComponent} from './components/owned-associations-card/owned-association-card.component';
import {DashboardState} from './store/dashboard.state';
import {JoinedAssociationsCardComponent} from './components/joined-associations-card/joined-associations.component';
import {SharedModule} from '../../shared/shared.module';
import {InvitationsCardComponent} from './components/invitations-card/invitations-card.component';

const states = [
    DashboardState
];

@NgModule({
    declarations: [
        DashboardComponent,
        OwnedAssociationsCardComponent,
        JoinedAssociationsCardComponent,
        InvitationsCardComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgxsModule.forFeature(states),
        SharedModule
    ],
    providers: [
        DashboardFacade
    ]
})
export class DashboardModule { }