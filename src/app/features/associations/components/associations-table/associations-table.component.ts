import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Association} from 'src/app/shared/models/associations/association.model';
import {AssociationCreated} from "../../../../shared/events/association-created.event";

@Component({
  selector: 'app-associations-table',
  templateUrl: './associations-table.component.html'
})
export class AssociationsTableComponent {
  @Input() public associations: Association[];
  @Output() public associationCreated = new EventEmitter<AssociationCreated>();
  public createAssociationOpen = false;

  public createAssociation($event: AssociationCreated): void {
    this.closeCreateAssociation();
    this.associationCreated.emit($event);
  }

  public openCreateAssociation(): void {
    this.createAssociationOpen = true;
  }

  public closeCreateAssociation(): void {
    this.createAssociationOpen = false;
  }
}
