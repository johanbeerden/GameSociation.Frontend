import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-leave-association-modal',
    templateUrl: './leave-association-modal.component.html'
})
export class LeaveAssociationModalComponent {
    @Input() public opened = false;
    @Output() public closed = new EventEmitter<boolean>();
    @Output() public associationLeft = new EventEmitter<true>();

    public leaveAssociation(): void {
        this.associationLeft.emit(true);
    }

    public close(): void {
        this.closed.emit(true);
    }
}
