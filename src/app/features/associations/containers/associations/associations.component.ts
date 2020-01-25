import {Component, OnInit} from '@angular/core';
import {AssociationsFacade} from '../../services/associations.facade';
import {AssociationCreated} from 'src/app/shared/events/association-created.event';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
})
export class AssociationsComponent implements OnInit {
  public associations$ = this.ownedAssociationsFacade.associations$;

  public constructor(private ownedAssociationsFacade: AssociationsFacade) { }

  public ngOnInit(): void {
    this.ownedAssociationsFacade.loadAssociations();
  }

  public createAssociation($event: AssociationCreated): void {
    this.ownedAssociationsFacade.createAssociation($event.name);
  }
}
