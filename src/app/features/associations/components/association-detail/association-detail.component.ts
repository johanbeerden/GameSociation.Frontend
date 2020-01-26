import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AssociationDetail} from 'src/app/shared/models/associations/association.model';
import {InvitedToAssociationEvent} from "../../events/invited-to-association.event";
import {MembershipRole} from "../../../../shared/models/associations/membership-role.enum";
import {MembershipStatus} from "../../../../shared/models/associations/membership-status.enum";
import {AssociationLeft} from "../../events/association-left.event";
import {AssociateKicked} from "../../events/associate-kicked.event";

@Component({
    selector: 'app-association-detail',
    templateUrl: './association-detail.component.html'
})
export class AssociationDetailComponent {
    @Input() public association: AssociationDetail;
    @Output() public invitedToAssociation = new EventEmitter<InvitedToAssociationEvent>();
    @Output() public associationLeft = new EventEmitter<AssociationLeft>();
    @Output() public associateKicked = new EventEmitter<AssociateKicked>();

    public MembershipRole = MembershipRole;
    public MembershipStatus = MembershipStatus;
    public inviteToAssociationOpen = false;
    public leaveAssociationOpen = false;
    public kickAssociateOpen = false;

    public openInviteToAssociation(): void {
        this.inviteToAssociationOpen = true;
    }

    public closeInviteToAssociation(): void {
        this.inviteToAssociationOpen = false;
    }

    public inviteToAssociation($event: InvitedToAssociationEvent): void {
        this.closeInviteToAssociation();
        this.invitedToAssociation.emit($event);
    }

    public openLeaveAssociation(): void {
        this.leaveAssociationOpen = true;
    }

    public closeLeaveAssociation(): void {
        this.leaveAssociationOpen = false;
    }

    public leaveAssociation($event: boolean): void {
        this.closeLeaveAssociation();
        if (!$event) {
            return;
        }
        const event = new AssociationLeft(this.association.id);
        this.associationLeft.emit(event);
    }

    public openKickAssociate(): void {
        this.kickAssociateOpen = true;
    }

    public closeKickAssociate(): void {
        this.kickAssociateOpen = false;
    }

    public kickAssociate(associateId: string): void {
        this.closeKickAssociate();
        const event = new AssociateKicked(this.association.id, associateId);
        this.associateKicked.emit(event);
    }
}
