import {Component, OnInit} from '@angular/core';
import {DashboardFacade} from '../../services/dashboard.facade';
import {AssociationCreated} from '../../../../shared/events/association-created.event';
import {InvitationAccepted} from "../../../../shared/events/invitation-accepted.event";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    public ownedAssociations$ = this.dashboardFacade.ownedAssociations$;
    public joinedAssociations$ = this.dashboardFacade.joinedAssociations$;
    public invitations$ = this.dashboardFacade.invitations$;

    public constructor(private dashboardFacade: DashboardFacade) {
    }

    public ngOnInit(): void {
        this.dashboardFacade.loadDashboard();
    }

    public createAssociation($event: AssociationCreated): void {
        this.dashboardFacade.createAssociation($event.name);
    }

    public acceptInvitation($event: InvitationAccepted): void {
        this.dashboardFacade.acceptInvitation($event.associationId);
    }

    public refuseInvitation($event: InvitationAccepted): void {
        this.dashboardFacade.refuseInvitation($event.associationId);
    }
}
