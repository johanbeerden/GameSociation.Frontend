import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CreateAssociationModalComponent} from './components/create-association-modal/create-association-modal.component';
import {ClarityModule} from '@clr/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssociationInvitationModalComponent} from './components/association-invitation-modal/association-invitation-modal.component';
import { InvitationsTableComponent } from './components/invitations-table/invitations-table.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        ClarityModule,
        FormsModule,
        ReactiveFormsModule 
    ],
    declarations: [
        CreateAssociationModalComponent,
        AssociationInvitationModalComponent,
        InvitationsTableComponent
    ],
    exports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        ClarityModule,
        FormsModule,
        ReactiveFormsModule,
        CreateAssociationModalComponent,
        AssociationInvitationModalComponent,
        InvitationsTableComponent
    ]
})
export class SharedModule {}