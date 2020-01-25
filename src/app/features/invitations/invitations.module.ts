import {NgModule} from '@angular/core';

import {InvitationsRoutingModule} from './invitations-routing.module';
import {NgxsModule} from "@ngxs/store";
import {InvitationsState} from "./store/invitations.state";
import {InvitationsFacade} from "./services/invitations.facade";
import {InvitationsComponent} from './containers/invitations/invitations.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [InvitationsComponent],
    imports: [
        SharedModule,
        InvitationsRoutingModule,
        NgxsModule.forFeature([InvitationsState])
    ],
    providers: [
        InvitationsFacade
    ]
})
export class InvitationsModule {
}
