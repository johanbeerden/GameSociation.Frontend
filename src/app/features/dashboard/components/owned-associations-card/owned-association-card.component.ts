import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Association } from 'src/app/shared/models/associations/association.model';
import { AssociationCreated } from '../../../../shared/events/association-created.event';

@Component({
  selector: 'app-owned-associations-card',
  templateUrl: './owned-association-card.component.html'
})
export class OwnedAssociationsCardComponent {
  @Input() public associations: Association[];
  @Output() public associationCreated = new EventEmitter<AssociationCreated>();

  public createAssociationOpen = false;

  public openCreateAssociation(): void {
    this.createAssociationOpen = true;
  }

  public closeCreateAssociation(): void {
    this.createAssociationOpen = false;
  }

  public createAssociation($event: AssociationCreated): void {
    this.closeCreateAssociation();
    this.associationCreated.emit($event);
  }
}
