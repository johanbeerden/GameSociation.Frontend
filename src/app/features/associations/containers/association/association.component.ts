import {Component, OnInit} from '@angular/core';
import {AssociationsFacade} from '../../services/associations.facade';
import {ActivatedRoute} from '@angular/router';
import {InvitedToAssociationEvent} from "../../events/invited-to-association.event";
import {AssociationLeft} from "../../events/association-left.event";
import {AssociateKicked} from "../../events/associate-kicked.event";

@Component({
    selector: 'app-association',
    templateUrl: './association.component.html',
})
export class AssociationComponent implements OnInit {
    public association$ = this.associationsFacade.association$;

    public constructor(private associationsFacade: AssociationsFacade, private activatedRoute: ActivatedRoute) {
    }

    public ngOnInit(): void {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.associationsFacade.loadAssociation(id);
    }

    public inviteToAssociation($event: InvitedToAssociationEvent): void {
        this.associationsFacade.inviteToAssociation($event.associationId, $event.username, $event.tagNumber);
    }

    public leaveAssociation($event: AssociationLeft): void {
        this.associationsFacade.leaveAssociation($event.associationId);
    }

    public kickAssociate($event: AssociateKicked): void {
        this.associationsFacade.kickAssociate($event.associationId, $event.associateId);
    }
}
