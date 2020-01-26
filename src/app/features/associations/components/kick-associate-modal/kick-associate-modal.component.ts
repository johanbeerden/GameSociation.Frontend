import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Membership} from "../../../../shared/models/associations/membership.model";

@Component({
    selector: 'app-kick-associate-modal',
    templateUrl: './kick-associate-modal.component.html'
})
export class KickAssociateModalComponent {
    @Input() public opened = false;
    @Input() public membership: Membership;
    @Output() public closed = new EventEmitter<boolean>();
    @Output() public associateKicked = new EventEmitter<string>();

    public kickAssociate(): void {
        this.associateKicked.emit(this.membership.associate.id);
    }

    public close(): void {
        this.closed.emit(true);
    }

    public getTag(): string {
        return `${this.membership.associate.tag.username}#${this.membership.associate.tag.number}`;
    }
}
