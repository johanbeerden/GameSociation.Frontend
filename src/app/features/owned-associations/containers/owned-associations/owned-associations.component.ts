import { Component, OnInit } from '@angular/core';
import { OwnedAssociationsFacade } from '../../services/owned-associations.facade';
import { AssociationCreated } from 'src/app/shared/events/association-created.event';

@Component({
  selector: 'app-owned-associations',
  templateUrl: './owned-associations.component.html',
})
export class OwnedAssociationsComponent implements OnInit {
  public associations$ = this.ownedAssociationsFacade.associations$;
  public createAssociationOpen = false;

  public constructor(private ownedAssociationsFacade: OwnedAssociationsFacade) { }

  public ngOnInit(): void {
    this.ownedAssociationsFacade.loadAssociations();
  }

  public createAssociation($event: AssociationCreated): void {
    this.closeCreateAssociation();
    this.ownedAssociationsFacade.createAssociation($event);
  }

  public openCreateAssociation(): void {
    this.createAssociationOpen = true;
  }

  public closeCreateAssociation(): void {
    this.createAssociationOpen = false;
  }
}
