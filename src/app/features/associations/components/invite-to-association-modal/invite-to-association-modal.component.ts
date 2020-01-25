import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InvitedToAssociationEvent} from "../../events/invited-to-association.event";

@Component({
  selector: 'app-invite-to-association-modal',
  templateUrl: './invite-to-association-modal.component.html',
})
export class InviteToAssociationModalComponent implements OnChanges{
  @Input() public opened = false;
  @Input() public associationId: string;
  @Output() public closed = new EventEmitter<boolean>();
  @Output() public invitedToAssociation = new EventEmitter<InvitedToAssociationEvent>();

  public form = new FormGroup({
    username: new FormControl('', Validators.required),
    tagNumber: new FormControl('', Validators.required)
  });

  public ngOnChanges(changes: SimpleChanges): void {
    const openedChanged = changes.opened;
    if(openedChanged && openedChanged.currentValue) {
      this.form.reset();
    }
  }

  public inviteToAssociation(): void {
    const username = this.form.get('username').value;
    const tagNumber = this.form.get('tagNumber').value;
    const event = new InvitedToAssociationEvent(this.associationId, username, +tagNumber);
    this.invitedToAssociation.emit(event);
  }

  public close(): void {
    this.closed.emit(true);
  }
}
