import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AssociationDetail} from 'src/app/shared/models/associations/association.model';
import {InvitedToAssociationEvent} from "../../events/invited-to-association.event";
import {MembershipRole} from "../../../../shared/models/associations/membership-role.enum";
import {MembershipStatus} from "../../../../shared/models/associations/membership-status.enum";

@Component({
    selector: 'app-owned-association-detail',
    templateUrl: './owned-association-detail.component.html'
})
export class OwnedAssociationDetailComponent {
    @Input() public association: AssociationDetail;
    @Output() public invitedToAssociation = new EventEmitter<InvitedToAssociationEvent>();

    public MembershipRole = MembershipRole;
    public MembershipStatus = MembershipStatus;
    public inviteToAssociationOpen = false;

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
}
