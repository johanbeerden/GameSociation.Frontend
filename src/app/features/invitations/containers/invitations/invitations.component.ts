import {Component, OnInit} from '@angular/core';
import {InvitationsFacade} from "../../services/invitations.facade";
import {InvitationAccepted} from "../../../../shared/events/invitation-accepted.event";
import {InvitationRefused} from "../../../../shared/events/invitation-refused.event";

@Component({
    selector: 'app-invitations',
    templateUrl: './invitations.component.html',
})
export class InvitationsComponent implements OnInit {
    public invitations$ = this.invitationsFacade.invitations$;

    public constructor(private invitationsFacade: InvitationsFacade) {
    }

    public ngOnInit(): void {
        this.invitationsFacade.loadInvitations();
    }

    public acceptInvitation($event: InvitationAccepted): void {
        this.invitationsFacade.acceptInvitation($event.associationId);
    }

    public refuseInvitation($event: InvitationRefused): void {
        this.invitationsFacade.refuseInvitation($event.associationId);
    }
}
