import {Component, OnInit} from '@angular/core';
import {OwnedAssociationsFacade} from '../../services/owned-associations.facade';
import {ActivatedRoute} from '@angular/router';
import {InvitedToAssociationEvent} from "../../events/invited-to-association.event";

@Component({
    selector: 'app-owned-association',
    templateUrl: './owned-association.component.html',
})
export class OwnedAssociationComponent implements OnInit {
    public association$ = this.ownedAssociationsFacade.association$;

    public constructor(private ownedAssociationsFacade: OwnedAssociationsFacade, private activatedRoute: ActivatedRoute) {
    }

    public ngOnInit(): void {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.ownedAssociationsFacade.loadAssociation(id);
    }

    public inviteToAssociation($event: InvitedToAssociationEvent): void {
        this.ownedAssociationsFacade.inviteToAssociation($event.associationId, $event.username, $event.tagNumber);
    }
}
