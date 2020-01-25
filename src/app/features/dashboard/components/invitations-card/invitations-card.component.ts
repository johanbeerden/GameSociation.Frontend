import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Invitation} from "../../../../shared/models/associations/invitation.model";
import {InvitationAccepted} from "../../../../shared/events/invitation-accepted.event";
import {InvitationRefused} from "../../../../shared/events/invitation-refused.event";

@Component({
  selector: 'app-invitations-card',
  templateUrl: './invitations-card.component.html'
})
export class InvitationsCardComponent {
  @Input() public invitations: Invitation[];
  @Output() public invitationAccepted = new EventEmitter<InvitationAccepted>();
  @Output() public invitationRefused = new EventEmitter<InvitationRefused>();
  public acceptInvitationOpen = false;
  public selectedInvitation: Invitation;

  public openAcceptInvitation(invitation: Invitation) {
    this.selectedInvitation = invitation;
    this.acceptInvitationOpen = true;
  }

  public closeAcceptInvitation() {
    this.acceptInvitationOpen = false;
    this.selectedInvitation = null;
  }

  public acceptInvitation($event: InvitationAccepted): void {
    this.closeAcceptInvitation();
    this.invitationAccepted.emit($event);
  }

  public refuseInvitation($event: InvitationRefused): void {
    this.closeAcceptInvitation();
    this.invitationRefused.emit($event);
  }
}
