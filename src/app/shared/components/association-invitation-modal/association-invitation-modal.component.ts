import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InvitationAccepted} from "../../events/invitation-accepted.event";
import {InvitationRefused} from "../../events/invitation-refused.event";
import {Invitation} from "../../models/associations/invitation.model";

@Component({
  selector: 'app-association-invitation-modal',
  templateUrl: './association-invitation-modal.component.html'
})
export class AssociationInvitationModalComponent {
  @Input() public opened = false;
  @Input() public invitation: Invitation;
  @Output() public closed = new EventEmitter<boolean>();
  @Output() public invitationAccepted = new EventEmitter<InvitationAccepted>();
  @Output() public invitationRefused = new EventEmitter<InvitationRefused>();

  public accept(): void {
    this.invitationAccepted.emit(new InvitationAccepted(this.invitation.associationId));
  }

  public refuse(): void {
    this.invitationRefused.emit(new InvitationRefused(this.invitation.associationId));
  }

  public close(): void {
    this.closed.emit(true);
  }
}
