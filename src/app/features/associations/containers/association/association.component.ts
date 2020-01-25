import {Component, OnInit} from '@angular/core';
import {AssociationsFacade} from '../../services/associations.facade';
import {ActivatedRoute} from '@angular/router';
import {InvitedToAssociationEvent} from "../../events/invited-to-association.event";
import {AssociationLeft} from "../../events/association-left.event";

@Component({
    selector: 'app-association',
    templateUrl: './association.component.html',
})
export class AssociationComponent implements OnInit {
    public association$ = this.ownedAssociationsFacade.association$;

    public constructor(private ownedAssociationsFacade: AssociationsFacade, private activatedRoute: ActivatedRoute) {
    }

    public ngOnInit(): void {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.ownedAssociationsFacade.loadAssociation(id);
    }

    public inviteToAssociation($event: InvitedToAssociationEvent): void {
        this.ownedAssociationsFacade.inviteToAssociation($event.associationId, $event.username, $event.tagNumber);
    }

    public leaveAssociation($event: AssociationLeft): void {
        this.ownedAssociationsFacade.leaveAssociation($event.associationId);
    }
}
